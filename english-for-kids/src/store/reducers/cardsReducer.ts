import { CHANGE_ARR_CARDS, CHANGE_ARR_STARS, CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_INDEX_CATEGORY, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, DELETE_CARD, DELETE_CATEGORY, FALSE_LEFT_MENU, GET_CARDS, GET_CATEGORIES, HADE_MENU, IAction, ICardsState, typePage, VIEW_LEFT_MENU } from "./cardsReducer.module"

export const listCards: ICardsState = {
    categoryCards: [],
    listCards: [],
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
        case FALSE_LEFT_MENU:
            return {...state, isShowLeftMenu: false}
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
        case GET_CARDS:
            return {...state, listCards: action.payload}
        case GET_CATEGORIES:
            return {...state, categoryCards: action.payload}
        case DELETE_CARD:
            state.listCards[action.payload.indexCategory].splice(action.payload.indexCard, 1);
            return {...state}
        case DELETE_CATEGORY:
            state.categoryCards.splice(action.payload, 1);
            state.listCards.splice(action.payload, 1);
            return {...state}


        default:
            return state;
    }
}
