import { getCar } from '../../api/garage/apiCar';
import { ICarsResponse } from '../../api/garage/apiCar.model';
import { getWinners } from '../../api/winners/apiWinner';
import { IGetWinners } from '../../api/winners/apiWinner.model';
import STORE from '../../store/store';
import { renderApp } from '../renderApp';

export async function listenWinners(): Promise<void> {
  const { items: winners, count: winnersCount } = await getWinners(STORE.winnersPage);
  STORE.winners = winners;
  STORE.winnersCount = +winnersCount;
  const arrCar: Promise<ICarsResponse>[] = STORE.winners.map((item) => getCar(item.id));
  STORE.winnerCars = await Promise.all(arrCar);
}

export function sortScore(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('score-header__wins')) {
      const sortWinners: IGetWinners = await getWinners(STORE.winnersPage, 10, 'wins', 'DESC');
      STORE.winners = sortWinners.items;
      renderApp();
    }
    if (target.classList.contains('score-header__time')) {
      const sortWinners: IGetWinners = await getWinners(STORE.winnersPage, 10, 'time', 'ASC');
      STORE.winners = sortWinners.items;
      renderApp();
    }
  });
}
