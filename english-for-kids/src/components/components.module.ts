import { ICards } from "../store/reducers/cardsReducer.module";
import { IFieldItem } from "../store/reducers/statisticReducer.module";

export const FIRST_ELEM = 0;
export const ADMIN = 'admin';

export interface ICardCategory {
  item: string;
  index: number;
}

export interface ICard {
  item: ICards;
  changeDisplayState(): void;
}

export interface IDetailsWord {
  item: IFieldItem;
  index: number;
}

export enum Counter {
  Trained = 'trained',
  Correct = 'correct',
  Incorrect = 'incorrect',
  Errors = 'errors',
}

export interface IInputValue {
  value: string,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
}
