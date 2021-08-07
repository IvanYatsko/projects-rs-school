export const CHANGE_STATISTIC_FIELD: string = 'CHANGE_STATISTIC_FIELD';
export const SORT_STATISTIC_FIELD: string = 'SORT_STATISTIC_FIELD';
export const WORDCHOOSE: string = 'choose';
export const WORDPLAY: string = 'play';
export const WORDSTAR: string = 'star';
export const WORDFLIPPED: string = 'flipped';
export const WORDBLUR: string = 'blur';
export const WORDDISABLED: string = 'disabled';
export const STAR: string = "star";
export const VALUE_ZERO: number = 0;
export const VALUE_HUNDRED: number = 100;
export const PAUZE_SECONDS: number = 500;
export const THREESECONDS: number = 3000;
export const RANDOM_NUMBER: number = 0.5;

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
