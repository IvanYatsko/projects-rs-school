import { cards, listcards } from "../../cards";
import { CHANGE_ARR_CARDS, CHANGE_ARR_STARS, CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_INDEX_CATEGORY, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, HADE_MENU, IAction, ICardsState, typePage, VIEW_LEFT_MENU } from "./cardsReducer.module"

export const listCards: ICardsState = {
    categoryCards: cards,
    listCards: listcards,
    indexCategory: null,
    isModePlay: false,
    isShowLeftMenu: false,
    arrGameWords: [],
    arrStars: [],
    page: typePage.MAIN_PAGE,
  }

export const cardsReducer = (state: ICardsState = listCards, action: IAction): ICardsState => {
    switch(action.type) {
        case CHOOSE_MAIN_PAGE:
            return {...state, page: typePage.MAIN_PAGE, isShowLeftMenu: false, indexCategory: null, arrGameWords: []}
        case CHOOSE_STATISTIC_PAGE:
            return {...state, page: typePage.STATISTIC_PAGE, isShowLeftMenu: false, indexCategory: null, arrGameWords: []}
        case CHOOSE_CATEGORY_PAGE:
            return {...state, page: typePage.CATEGORIES_PAGE, isShowLeftMenu: false, indexCategory: action.payload, arrGameWords: []}
        case VIEW_LEFT_MENU:
            return {...state, isShowLeftMenu: !state.isShowLeftMenu}
        case CHOOSE_INDEX_CATEGORY:
            return {...state, indexCategory: action.payload}
        case CHANGE_STATUS_GAME:
            return {...state, isModePlay: !state.isModePlay, arrGameWords: []}
        case HADE_MENU:
            return {...state, isShowLeftMenu: false}
        case CHANGE_ARR_CARDS:
            return {...state, arrGameWords: action.payload}
        case CHANGE_ARR_STARS:
            return {...state, arrStars: action.payload}


        default:
            return state;
    }
}
