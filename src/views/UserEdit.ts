import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

export class UserEdit extends View<User, UserProps> {
  // OVERRIDE METHOD
  // This will be called by private View method, mapRegions, returned keys in regionsMap will be set as keys in regions (View property), and add the selectors, provided here as values
  regionsMap(): { [key: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    };
  }

  // This will be called before rendering the UserEdits
  // OVERRIDE METHOD
  onRender(): void {
    // Do our nesting, these classes, require model and the parent element, parent element is already defined in regions (View property) by mapRegions (View method)
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
