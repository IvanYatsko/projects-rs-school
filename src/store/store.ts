import { getCars } from '../api/garage/apiCar';
import { IStore } from './store.model';

const STORE: IStore = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: [],
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'ASC',
  showTextWinner: '',
  driveAnimation: { race: true, reset: false },
  saveCreate: { color: '', value: '' },
  saveUpdate: { color: '', value: '' },
  winnerCars: [],
  inputCreate: '',
  colorCreate: '',
};

export async function initStore(): Promise<void> {
  const { items: cars, count: carsCount } = await getCars(STORE.carsPage);
  STORE.cars = cars;
  STORE.carsCount = +carsCount;
}

export default STORE;
