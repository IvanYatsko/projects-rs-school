export const CHOOSE_MAIN_PAGE = 'CHOOSE_MAIN_PAGE';
export const CHOOSE_STATISTIC_PAGE = 'CHOOSE_STATISTIC_PAGE';
export const CHOOSE_CATEGORY_PAGE = 'CHOOSE_CATEGORY_PAGE';
export const VIEW_LEFT_MENU = 'VIEW_LEFT_MENU';
export const CHOOSE_INDEX_CATEGORY = 'CHOOSE_INDEX_CATEGORY';
export const CHANGE_STATUS_GAME = 'CHANGE_STATUS_GAME';
export const HADE_MENU = 'HADE_MENU';
export const CHANGE_ARR_CARDS = 'CHANGE_ARR_CARDS';

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
