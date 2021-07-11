export const CHANGE_STATISTIC_FIELD: string = 'CHANGE_STATISTIC_FIELD';
export const SORT_STATISTIC_FIELD: string = 'SORT_STATISTIC_FIELD';
export const VALUE_ZERO: number = 0;

export interface IlistStatistic {
  field: IFieldItem[];
  sort: ISortItem;
}

export interface IFieldItem {
  category: string;
  word: string;
  translation: string;
  trained: number;
  correct: number;
  incorrect: number;
  errors: number;
}

export interface ISortItem {
  category: boolean;
  word: boolean;
  translation: boolean;
  trained: boolean;
  correct: boolean;
  incorrect: boolean;
  errors: boolean;
}

export enum StatisticTitle {
  CATEGORY = 'category',
  WORD = 'word',
  TRANSLATION = 'translation',
  TRAINED = 'trained',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  ERRORS = 'errors',
}

export type KeyStatistic = keyof ISortItem;
