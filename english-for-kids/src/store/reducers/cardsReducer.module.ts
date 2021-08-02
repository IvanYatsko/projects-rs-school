export const CHOOSE_MAIN_PAGE: string = 'CHOOSE_MAIN_PAGE';
export const CHOOSE_STATISTIC_PAGE: string = 'CHOOSE_STATISTIC_PAGE';
export const CHOOSE_CATEGORY_PAGE: string = 'CHOOSE_CATEGORY_PAGE';
export const VIEW_LEFT_MENU: string = 'VIEW_LEFT_MENU';
export const FALSE_LEFT_MENU: string = 'FALSE_LEFT_MENU';
export const CHOOSE_INDEX_CATEGORY: string = 'CHOOSE_INDEX_CATEGORY';
export const CHANGE_STATUS_GAME: string = 'CHANGE_STATUS_GAME';
export const HADE_MENU: string = 'HADE_MENU';
export const CHANGE_ARR_CARDS: string = 'CHANGE_ARR_CARDS';
export const CHANGE_ARR_STARS: string = 'CHANGE_ARR_STARS';
export const GET_CARDS: string = 'GET_CARDS';
export const GET_CATEGORIES: string = 'GET_CATEGORIES';
export const DELETE_CARD: string = 'DELETE_CARD';
export const DELETE_CATEGORY: string = 'DELETE_CATEGORY';
export const CREATE_CARD: string = 'CREATE_CARD';
export const CREATE_CATEGORY: string = 'CREATE_CATEGORY';
export const UPDATE_CARD: string = 'UPDATE_CARD';
export const UPDATE_CATEGORY: string = 'UPDATE_CATEGORY';

export interface ICardsState {
  categoryCards: string[];
  listCards: ICards[][];
  indexCategory: number | null;
  isModePlay: boolean;
  isShowLeftMenu: boolean;
  arrGameWords: ICards[];
  arrStars: Stars[];
  page: typePage;
}

export interface ICards {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export enum Stars {
  STAR = 'star',
  STAR_WIN = 'star-win',
}

export enum typePage {
  CATEGORIES_PAGE = 'CATEGORIES_PAGE',
  MAIN_PAGE = 'MAIN_PAGE',
  STATISTIC_PAGE = 'STATISTIC_PAGE',
}

export interface IAction {
  type: string;
  payload?: any;
}

export enum links {
  categories = 'https://blooming-reef-80159.herokuapp.com/api/categories',
  cards = 'https://blooming-reef-80159.herokuapp.com/api/cards',
  admin = 'https://blooming-reef-80159.herokuapp.com/api/admin',
  static = 'https://blooming-reef-80159.herokuapp.com/',
}
