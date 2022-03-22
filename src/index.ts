import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

const url = 'http://localhost:3000/users';
// This will fetch the users collection
const users = new Collection<User, UserProps>(url, json => {
  return User.buildUser(json);
});

users.on('change', () => {
  // This will render the users collection
  const root = document.getElementById('root');
  if (root) new UserList(root, users).render();
});

users.fetch();
