import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  model: T[] = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((res: AxiosResponse): void => {
      res.data.forEach((userProps: K): void => {
        this.model.push(this.deserialize(userProps));
      });

      this.trigger('change');
    });
  }
}
