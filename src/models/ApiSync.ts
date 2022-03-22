import axios, { AxiosPromise } from 'axios';
import { SyncInterface } from './Model';

// You can only use ApiSync class, if what is provided as generic constant has an id property that is a number
interface HasId {
  id?: number;
}

// Every Model Creating class will delegate the fetching and saving behavior to this ApiSync class
export class ApiSync<T extends HasId> implements SyncInterface<T> {
  constructor(public rootUrl: string) {}

  // Model creating class will call fetch, and save the returned data itself
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      // Send PUT request to same record
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // Create new record in the DB

      return axios.post(this.rootUrl, data);
    }
  }
}
