import { Dispatch } from 'redux';

import {
  CHANGE_INDEX_CATEGORY,
  CHANGE_IS_ADMIN,
  GET_IS_ADMIN,
  VIEW_LOGIN_WINDOW,
} from '../reducers/adminReducer.module';
import { IAction, links } from '../reducers/cardsReducer.module';


export function viewLoginWindow(condition: boolean): IAction {
  return { type: VIEW_LOGIN_WINDOW, payload: condition };
}

export function changeIsAdmin(condition: boolean): IAction {
  return { type: CHANGE_IS_ADMIN, payload: condition };
}

export function changeIndexCategory(index: number): IAction {
  return { type: CHANGE_INDEX_CATEGORY, payload: index };
}

export function getIsAdmin(): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      const response: Response = await fetch(links.admin);
      dispatch({ type: GET_IS_ADMIN, payload: await response.json() });
    } catch (e) {
      throw Error(e);
    }
  };
}

export function setFetchAuth(
  isAdmin: boolean
): (dispatch: Dispatch<IAction>) => Promise<void> {
  return async (dispatch: Dispatch<IAction>) => {
    try {
      await fetch(links.admin, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin }),
      });
    } catch (e) {
      throw Error(e);
    }
  };
}
