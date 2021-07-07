import { cards, listcards } from "../../cards";
import { CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_INDEX_CATEGORY, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, HADE_MENU, IAction, ICardsState, typePage, VIEW_LEFT_MENU } from "./cardsReducer.module"

const listCards: ICardsState = {
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
            return {...state, page: typePage.MAIN_PAGE, isShowLeftMenu: false, indexCategory: null}
        case CHOOSE_STATISTIC_PAGE:
            return {...state, page: typePage.STATISTIC_PAGE, isShowLeftMenu: false, indexCategory: null}
        case CHOOSE_CATEGORY_PAGE:
            return {...state, page: typePage.CATEGORIES_PAGE, isShowLeftMenu: false, indexCategory: action.payload}
        case VIEW_LEFT_MENU:
            return {...state, isShowLeftMenu: !state.isShowLeftMenu}
        case CHOOSE_INDEX_CATEGORY:
            return {...state, indexCategory: action.payload}
        case CHANGE_STATUS_GAME:
            return {...state, isModePlay: !state.isModePlay}
        case HADE_MENU:
            return {...state, isShowLeftMenu: false}


        default:
            return state;
    }
}
