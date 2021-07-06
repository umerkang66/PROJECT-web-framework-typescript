import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};
  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: (e?: Event) => void } {
    return {};
  }

  bindModel(): void {
    const events = ['change', 'save'];

    events.forEach((event: string): void => {
      this.model.on(event, () => {
        this.update();
      });
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    Object.keys(eventsMap).forEach((eventKey: string): void => {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    });
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    Object.keys(regionsMap).forEach((key: string): void => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (!element) return;

      this.regions[key] = element;
    });
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }

  update(): void {
    const newMarkup = this.template();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parent.querySelectorAll('*'));

    newElements.forEach((newEl: Element, i: number) => {
      const curEl = curElements[i];
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr: Attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
}
