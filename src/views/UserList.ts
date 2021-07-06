import { Collection } from '../models/Collection';
import { User, UserProps } from '../models/User';
import { CollectionView } from './CollectionView';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  constructor(rootId: Element, collection: Collection<User, UserProps>) {
    super(rootId, collection);
  }

  renderItem(model: User, parent: Element) {
    const userShow = new UserShow(parent, model);
    userShow.render();
  }
}
