import { getCar } from '../../api/garage/apiCar';
import { ICarsResponse } from '../../api/garage/apiCar.model';
import { getWinners } from '../../api/winners/apiWinner';
import STORE from '../../store/store';

export async function listenWinners(): Promise<void> {
  const { items: winners, count: winnersCount } = await getWinners(STORE.winnersPage);
  STORE.winners = winners;
  STORE.winnersCount = +winnersCount;
  const arrCar: Promise<ICarsResponse>[] = STORE.winners.map((item) => getCar(item.id));
  STORE.winnerCars = await Promise.all(arrCar);
}
