import { Dispatch } from "redux";
import {  CHANGE_ARR_CARDS, CHANGE_ARR_STARS, CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, FALSE_LEFT_MENU, GET_CARDS, GET_CATEGORIES, IAction, ICards, links, Stars, VIEW_LEFT_MENU } from "../reducers/cardsReducer.module";

export function chooseMainPage(): IAction {
    return { type: CHOOSE_MAIN_PAGE }
}
export function chooseStatisticPage(): IAction {
    return { type: CHOOSE_STATISTIC_PAGE }
}
export function chooseCategoryPage(index: number): IAction {
    return { type: CHOOSE_CATEGORY_PAGE, payload: index }
}
export function viewLeftMenu(): IAction {
    return { type: VIEW_LEFT_MENU }
}
export function falseLeftMenu(): IAction {
    return { type: FALSE_LEFT_MENU }
}
export function changeModeGame(): IAction {
    return { type: CHANGE_STATUS_GAME }
}
export function changeArrCards(arr: ICards[]): IAction {
    return { type: CHANGE_ARR_CARDS, payload: arr}
}
export function changeArrStars(arr: Stars[]): IAction {
    return { type: CHANGE_ARR_STARS, payload: arr}
}

export function getCards(): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(links.cards);
      dispatch({type: GET_CARDS, payload: (await response.json())});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function getCategories(): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(links.categories);
      dispatch({type: GET_CATEGORIES, payload: (await response.json())});
    } catch (e) {
      throw Error(e);
    }
  }
}
