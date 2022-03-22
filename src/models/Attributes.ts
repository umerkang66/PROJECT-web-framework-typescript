// IMPORTANT! Without bind call, the this keyword inside Attributes, becomes the this keyword of User class, an instance of User class is calling Attribute method, we have to manually bind the Attribute instance "this" to methods that are coming from Attribute class, We can bind this or use an arrow function

import { ModelAttributes } from './Model';

// In typescript the keys of the object can be types as well
export class Attributes<T> implements ModelAttributes<T> {
  constructor(private data: T) {}

  // Here we are saying that, value of K can be one of the keys of T
  // Here T can be UserProps (keys: id, age, name), so K is one of the keys of T so, K type can be (id, age, name), what we return here is value of K at T i.e. (number, number, string) because {id: number; age: number; name: string}
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
