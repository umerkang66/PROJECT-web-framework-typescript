import { AxiosPromise, AxiosResponse } from 'axios';
import { Callback } from './Eventing';

export interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

export interface SyncInterface<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    // Wire up the static dependencies of User class, we also don't need to create interface

    // If we are assigning the properties using the modified syntax, not in the constructor function, these occur before the constructor function, SO we can write the shorten delegation method syntax
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: SyncInterface<T>
  ) {}

  // Delegation methods, delegate behavior to related classes
  // This only runs if properties of this class has been created by modifier syntax
  public on = this.events.on;
  public trigger = this.events.trigger;
  public get = this.attributes.get;

  // Use these methods without getters, and also throw the change event
  public set(update: T): void {
    this.attributes.set(update);
    // By doing this, all the callback that will be registered for change event, will be called, if there is nothing, no one will be called
    this.events.trigger('change');
  }

  public fetch(): void {
    // For get we can use both of these, this.get or this.attributes.get, because there is not extra functionality
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((res: AxiosResponse<T>): void => {
      // When fetch the data update the attributes property, by using set method

      // Should we use this.set() or this.attributes.set(), if we use the second method, we are going to skip out the change event
      this.set(res.data);
    });
  }

  public save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse<T>): void => {
        // We are not using the response
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
