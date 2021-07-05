import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private modelAttributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get get() {
    return this.modelAttributes.get;
  }
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  set(update: T): void {
    this.modelAttributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.modelAttributes.get('id');
    if (!id) throw new Error('Cannot fetch without an id');

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save(): void {
    const data = this.modelAttributes.getAll();
    this.sync
      .save(data)
      .then((): void => {
        this.trigger('save');
      })
      .catch((err: AxiosError) => {
        console.error(err);
        this.trigger('error');
      });
  }
}