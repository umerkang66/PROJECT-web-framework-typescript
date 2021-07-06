import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  constructor(parent: Element, model: User) {
    super(parent, model);
  }

  eventsMap(): { [key: string]: (e?: Event) => void } {
    return {
      'click:.set-age': this.onButtonClickSetAge,
      'click:.set-name': this.onButtonClickSetName,
      'click:.save-model': this.onButtonClickSaveModel,
    };
  }

  onButtonClickSaveModel = (): void => {
    this.model.save();
  };

  onButtonClickSetName = (): void => {
    const input = this.parent.querySelector('input');
    if (!input) return;

    const newName = input.value;
    if (!newName) return;
    this.model.setNewUserName(newName);
    input.value = '';
  };

  onButtonClickSetAge = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('userName')}" />
        <button class="set-name">Change name</button>
        <button class="set-age">Set random age</button>
        <button class="save-model">Save</button>
      </div>;
    `;
  }
}
