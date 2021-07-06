import { ROOT_URL } from '../config';
import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';
import { CollectionView } from './CollectionView';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, parent: Element) {
    const userShow = new UserShow(parent, model);
    userShow.render();
  }
}
