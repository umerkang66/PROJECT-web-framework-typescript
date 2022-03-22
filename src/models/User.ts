import { Collection } from './Collection';
import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';

export interface UserProps {
  name?: string;
  age?: number;
  // If user has a id, it means it is saved to the DB
  id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  public static buildUser(attr: UserProps): User {
    return new User(
      new Attributes<UserProps>(attr),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  public static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps): User => this.buildUser(json)
    );
  }

  public setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
