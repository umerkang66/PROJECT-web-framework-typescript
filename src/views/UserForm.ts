import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  // This is overriding the default eventsMap in View
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  // This method is used eventHandler, so turn it into arrow function or bind this function when passed in the eventHandler
  private onSetAgeClick(): void {
    this.model.setRandomAge();
  }

  private onSetNameClick(): void {
    const input = this.parent.querySelector('input');

    if (input) {
      this.model.set({ name: input.value });
    }
  }

  private onSaveClick(): void {
    this.model.save();
  }

  public template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set random age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
