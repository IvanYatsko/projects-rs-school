import './best-item.scss';
import { BaseComponent } from '../../../../base-component';
import { EMAIL, FIRST_NAME, IMAGE, LAST_NAME } from './best-item.config';

export class BestItem extends BaseComponent {
  constructor(user: { firstName: string; lastName: string; email: string } | undefined, item: number | unknown[]) {
    super('div', ['best-score__item']);
    if (!user) throw Error();
    const arrUser = Object.values(user);

    this.element.innerHTML = `
    <div class="best-score__item-data">
      <div class="best-score__item-image"></div>
      <div class="best-score__item-contact">
        <p class="best-score__item-name text-name text">${arrUser[FIRST_NAME]} ${arrUser[LAST_NAME]}</p>
        <p class="best-score__item-email text">${arrUser[EMAIL]}</p>
      </div>
    </div>
    <div class="best-score__item-score">
      <p class="text-score text">Score:  <span class="best-score__item-score-num text-blue">${item}</span></p>
    </div>
    `;
    if (arrUser[IMAGE]) {
      const img = new Image();
      img.setAttribute('src', arrUser[IMAGE]);
      this.element.querySelector('.best-score__item-image')?.append(img);
    }
  }
}
