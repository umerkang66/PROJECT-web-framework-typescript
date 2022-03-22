import { Model } from '../models/Model';

// We are going to pass two generic arguments, first is T, that will be one of the model instances, and second is K, that will be Model Attributes property
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  // Instead of making eventsMap abstract method, make it a default method (and give it a default functionality), so it can be override by other extending classes, where needed, (where it doesn't need to be needed, this default one will occur)
  // This is an optional method
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  onRender(): void {}

  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  private bindModel(): void {
    // Once change event occur please, rerender
    this.model.on('change', () => {
      this.render();
    });
  }

  private bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey].bind(this));
      });
    }
  }

  private clear(): void {
    this.parent.innerHTML = '';
  }

  private mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  public render(): void {
    // Before rendering first, clear the previous element
    this.clear();

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    // Bind events
    this.bindEvents(templateElement.content);
    // Create an object of parent Elements where nested instances of classes (View Elements) will be nested
    this.mapRegions(templateElement.content);
    // Actually nesting stuff happens here
    this.onRender();

    this.parent.append(templateElement.content);
  }
}
