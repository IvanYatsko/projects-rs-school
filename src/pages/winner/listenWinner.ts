import { getCar } from '../../api/garage/apiCar';
import { ICarsResponse } from '../../api/garage/apiCar.model';
import { getWinners } from '../../api/winners/apiWinner';
import { IGetWinners } from '../../api/winners/apiWinner.model';
import STORE from '../../store/store';
import { renderApp } from '../renderApp';
import { renderWinner } from './renderWinner';

export async function listenWinners(): Promise<void> {
  const { items: winners, count: winnersCount } = await getWinners(STORE.winnersPage);
  STORE.winners = winners;
  STORE.winnersCount = +winnersCount;
  const arrCar: Promise<ICarsResponse>[] = STORE.winners.map((item) => getCar(item.id));
  STORE.winnerCars = await Promise.all(arrCar);
  const page: HTMLElement = document.getElementById('page') as HTMLElement;
  page.innerHTML = renderWinner();
}

export function sortScore(): void {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('score-header__wins')) {
      STORE.sortBy = 'wins';
      STORE.sortOrder = STORE.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      const sortWinners: IGetWinners = await getWinners();
      STORE.winners = sortWinners.items;
      renderApp();
    }
    if (target.classList.contains('score-header__time')) {
      STORE.sortBy = 'time';
      STORE.sortOrder = STORE.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      const sortWinners: IGetWinners = await getWinners();
      STORE.winners = sortWinners.items;
      renderApp();
    }
  });
}

// async function changePageWinnerr() :Promise<void> {
//   const arrayCars = await getWinners(STORE.winnersPage);
//   STORE.winners = arrayCars.items;
//   STORE.carsCount = +arrayCars.count;
//   const nextPage = renderCars();
//   (document.getElementById('main') as HTMLElement).innerHTML = nextPage;
// }
