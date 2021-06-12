import { ICarsResponse } from '../api/garage/apiCar.model';
import { IGetWinner } from '../api/winners/apiWinner.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IGetWinner[],
  winnersCount: number,
  animation: object,
  view: string,
  sortBy: null,
  sortOrder: null,
}
