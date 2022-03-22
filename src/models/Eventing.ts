// IMPORTANT! Without bind call, the this keyword inside Attributes, becomes the this keyword of User class, an instance of User class is calling Attribute method, we have to manually bind the Attribute instance "this" to methods that are coming from Attribute class, We can bind this or use an arrow function
// If we didn't use the arrow function, these methods will still work, because these methods only access this.events, and this.events is also presents on User class see it yourself

import { Events } from './Model';

export type Callback = () => void;

export class Eventing implements Events {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    // If at a certain name, no event handlers are registered, then it will be undefined, so initialize it with empty array
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    // If we initialize it with an empty array, then there is no way, that callback will automatically be pushed in the original events array
    // So point the handlers to this.events[eventName]
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) return;

    handlers.forEach(callback => callback());
  };
}
