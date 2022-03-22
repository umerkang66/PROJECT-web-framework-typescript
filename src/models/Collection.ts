import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  private events: Eventing = new Eventing();
  public models: T[] = [];

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  // Here we cannot use the shorthand syntax, because we are initializing the properties above, that is under the hood, being initialized in constructor
  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse<K[]>): void => {
      res.data.forEach((value: K): void => {
        this.models.push(this.deserialize(value));
      });

      // Emit the change event
      this.trigger('change');
    });
  }
}
