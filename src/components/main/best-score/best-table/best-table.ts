import './best-table.scss';
import { BaseComponent } from '../../../base-component';
import { BestItem } from './best-item/best-item';

export class BestTable extends BaseComponent {
  private readonly bestItem: BestItem;

  constructor(user: { firstName: string; lastName: string; email: string } | undefined, item: number | unknown[]) {
    super('div', ['best-score__table']);
    this.bestItem = new BestItem(user, item);

    this.element.appendChild(this.bestItem.element);
  }
}
