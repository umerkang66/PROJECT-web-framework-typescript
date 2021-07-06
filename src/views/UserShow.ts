import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  constructor(parent: Element, model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <div>
        <h1>User Detail</h1>
        <h4>User name: ${this.model.get('userName')}</h4>
        <h4>User age: ${this.model.get('age')}</h4>
      </div>
    `;
  }
}
