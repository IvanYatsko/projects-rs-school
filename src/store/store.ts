import { getCars } from "../api/garage/apiCar";
import { getWinners } from "../api/winners/apiWinner";
import { IStore } from "./store.model";


const STORE: IStore = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};

export async function initStore(): Promise<void> {
  const { items: cars, count: carsCount } = await getCars(1);
  STORE.cars = cars;
  STORE.carsCount = +carsCount;
  const { items: winners, count: winnersCount } = await getWinners(1);
  STORE.winners = winners;
  STORE.winnersCount = +winnersCount;
}
