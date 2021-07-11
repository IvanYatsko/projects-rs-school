export const CHANGE_STATISTIC_FIELD: string = 'CHANGE_STATISTIC_FIELD';

export interface IlistStatistic {
  field: IFieldItem[];
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
