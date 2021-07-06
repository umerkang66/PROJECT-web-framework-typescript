import { ROOT_URL } from './config';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';
import { UserList } from './views/UserList';

const users = new Collection(ROOT_URL, (userProps: UserProps): User => {
  return new User(userProps);
});

users.on('change', () => {
  const rootId = document.getElementById('root');
  if (!rootId) return;

  const userList = new UserList(rootId, users);
  userList.render();
});

users.fetch();
