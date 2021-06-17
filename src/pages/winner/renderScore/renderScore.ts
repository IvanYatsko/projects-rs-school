import { IGetWinner } from '../../../api/winners/apiWinner.model';
import { svgCar } from '../../../shared/svgCar';
import STORE from '../../../store/store';

export function renderScore(winnerValue: IGetWinner, key: number): string {
  return `
  <div class="score-main">
  <div class="score-main__text">${key}</div>
  <div class="score-main__text">
  <picture class="svg-winner">${svgCar(STORE.winnerCars.find((item) => item.id === winnerValue.id)?.color as string)}
  </picture>
  </div>
  <div class="score-main__text">${STORE.winnerCars.find((item) => item.id === winnerValue.id)?.name}</div>
  <div class="score-main__text">${winnerValue.wins}</div>
  <div class="score-main__text">${winnerValue.time}</div>
</div>`;
}
