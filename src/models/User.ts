import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { ROOT_URL } from '../config';
import { Collection } from './Collection';

export interface UserProps {
  userName?: string;
  age?: number;
  id?: number;
}

export class User extends Model<UserProps> {
  constructor(data: UserProps) {
    super(
      new Attributes<UserProps>(data),
      new Eventing(),
      new ApiSync<UserProps>(ROOT_URL)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      ROOT_URL,
      (userProps: UserProps) => new User(userProps)
    );
  }

  setRandomAge(): void {
    const age = Math.trunc(Math.random() * 100) + 1;
    this.set({ age });
  }

  setNewUserName(newName: string): void {
    this.set({ userName: newName });
  }
}
