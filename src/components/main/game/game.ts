import './game.scss';
import { BaseComponent } from '../../base-component';
import { Card } from './main-cards/card/card';
import { MainCards } from './main-cards/main-cards';
import { delay } from '../../../shared/delay';
import { MainTimer } from './main-timer/main-timer';
import { ImageCategoryModel } from '../../../models/image-category-model';
import { IndexedDb } from '../../../shared/indexeddb';
import { DIF_COLUMN, FORMULA_NUM, FORMULA_NUM2, MIN, RANDOM_NUMBER, SEC, SECONDS, VAR_CARDS } from './game.config';

const FLIP_DELAY = 1000;
let successFlipped = 0;
const URL_SCORE = '/best-score';

export class Game extends BaseComponent {
  private readonly mainCards: MainCards;

  private activeCard?: Card;

  private isAnimation: boolean = false;

  private readonly mainTimer: MainTimer;

  constructor() {
    super('div', ['main-game']);
    this.mainCards = new MainCards();
    this.mainTimer = new MainTimer();
    this.element.appendChild(this.mainTimer.element);
    this.element.appendChild(this.mainCards.element);
  }

  async start(difficult : string, gameCards : string) : Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    let card : string[] = [];
    let categ = '';
    categories.forEach((item) => {
      if (item.category === gameCards) {
        card = item.images;
        categ = item.category;
      }
    });
    const dif = difficult.slice(0, DIF_COLUMN);
    const numberCards = (+dif) ** VAR_CARDS / VAR_CARDS;
    card = card.slice(0, numberCards);

    const images = card.map((name) => `${categ}/${name}`);
    this.newGame(images, +dif);
  }

  newGame(images: string[], dif : number) : void {
    this.clearGame();

    const cards = images
      .concat(images)
      .map((url) => new Card(url, dif))
      .sort(() => Math.random() - RANDOM_NUMBER);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));
    this.mainCards.addCards(cards);
  }

  clearGame() : void {
    this.mainCards.clear();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await Promise.all([this.activeCard.showError(), card.showError()]);
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      successFlipped++;
      await Promise.all([this.activeCard.showSuccess(), card.showSuccess()]);
      if (this.mainCards.cards.every((item) => item.element.classList.contains('main__card_success'))) {
        if (!this.mainCards.timerId) throw Error('Error');
        clearInterval(this.mainCards.timerId);
        const timeArr = (document.querySelector('.main-timer__text') as HTMLInputElement).textContent?.split(':');
        if (!timeArr) throw Error('Error');
        const time = (+timeArr[MIN] * SECONDS) + timeArr[SEC];
        const score = (successFlipped * FORMULA_NUM) - (+time * FORMULA_NUM2);
        IndexedDb.addData({ score });
        const win = window.confirm('Поздравляю');
        if (win) window.location.hash = URL_SCORE;
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
