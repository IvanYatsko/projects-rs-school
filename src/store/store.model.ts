import { ICarsResponse } from '../api/garage/apiCar.model';
import { IGetWinner } from '../api/winners/apiWinner.model';

export interface IStore {
  carsPage: number,
  cars: ICarsResponse[],
  carsCount: number,
  winnersPage: number,
  winners: IGetWinner[],
  winnersCount: number,
  animation: IAnimation[],
  view: string,
  sortBy: string,
  sortOrder: string,
  showTextWinner: string,
  driveAnimation: IDriveAnimation,
  saveCreate: ISaveInput,
  saveUpdate: ISaveInput,
  winnerCars: ICarsResponse[],
  inputCreate: string,
  colorCreate: string,
}

export interface ISaveInput {
  color: string,
  value: string,
}

export interface IDriveAnimation {
  isRace: boolean,
  isReset: boolean,
}

export interface IFrame {
  id: number,
  positionCar: number,
  isStart: boolean,
  isFinish: boolean,
  isDrive: boolean
}

export interface IAnimation {
  id: string,
  dataAnimation: IFrame,
}
