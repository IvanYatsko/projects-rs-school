import { Dispatch } from "redux";
import {  CHANGE_ARR_CARDS, CHANGE_ARR_STARS, CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, CREATE_CARD, CREATE_CATEGORY, DELETE_CARD, DELETE_CATEGORY, FALSE_LEFT_MENU, GET_CARDS, GET_CATEGORIES, IAction, ICards, links, Stars, UPDATE_CARD, UPDATE_CATEGORY, VIEW_LEFT_MENU } from "../reducers/cardsReducer.module";

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

export function deleteCard(indexCategory: number, indexCard: number): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(`${links.cards}/${indexCategory}/${indexCard}`, {
        method: 'DELETE',
      });
      dispatch({type: DELETE_CARD, payload: {indexCategory, indexCard}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function deleteCategory(index: number): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(`${links.categories}/${index}`, {
        method: 'DELETE',
      });
      dispatch({type: DELETE_CATEGORY, payload: index});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function createCard(indexCategory: number, data: ICards): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(links.cards, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, data}),
      });
      dispatch({type: CREATE_CARD, payload: {indexCategory, data}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function createCategory(nameCategory: string): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(links.categories, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nameCategory}),
      });
      dispatch({type: CREATE_CATEGORY, payload: nameCategory});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function updateCard(indexCategory: number, indexCard: number, data: ICards): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(links.cards, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, indexCard, data}),
      });
      dispatch({type: UPDATE_CARD, payload: {indexCategory, indexCard, data}});
    } catch (e) {
      throw Error(e);
    }
  }
}

export function updateCategory(indexCategory: number, nameCategory: string): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(links.categories, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({indexCategory, nameCategory}),
      });
      dispatch({type: UPDATE_CATEGORY, payload: {indexCategory, nameCategory}});
    } catch (e) {
      throw Error(e);
    }
  }
}
