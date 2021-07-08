import { ICards } from "../store/reducers/cardsReducer.module";

export const FIRST_ELEM = 0;

export interface ICardCategory {
  item: string;
  index: number;
}

export interface ICard {
  item: ICards;
  changeDisplayState(): void;
}
