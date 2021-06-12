import './main-cards.scss';
import { BaseComponent } from '../../../base-component';
import { Card } from './card/card';

const SHOW_TIME = 30;
const MILLISECONDS = 1000;

export class MainCards extends BaseComponent {
  public cards: Card[] = [];

  public finishGame = false;

  public timerId: NodeJS.Timeout | undefined;

  constructor() {
    super('div', ['main-cards']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      this.startTimer();
    }, SHOW_TIME * MILLISECONDS);
  }

  startTimer() :void {
    const timer = document.querySelector('.main-timer');

    let timeValue = 0;
    const drawTimer = () => {
      if (timer == null) throw Error('Element not found');
      timeValue += MILLISECONDS;
      const d = new Date(timeValue);
      const strTimer = `0${d.getMinutes()}:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`;
      timer.innerHTML = strTimer;
      timer?.classList.add('text');
      timer?.classList.add('main-timer__text');
    };
    this.timerId = setInterval(() => {
      drawTimer();
    }, MILLISECONDS);
  }
}
