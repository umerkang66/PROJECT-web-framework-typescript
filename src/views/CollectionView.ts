import { Collection } from '../models/Collection';

// T can be instance of class that has be collected, and K is what attribute properties that instance of class (instance of Class i.e. T) has
export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  // This will render a single item from the below loop
  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    for (let model of this.collection.models) {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);

      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
