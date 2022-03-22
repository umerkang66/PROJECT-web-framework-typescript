import { User, UserProps } from '../models/User';
import { CollectionView } from './CollectionView';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  // This will render a single item from the below loop
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
