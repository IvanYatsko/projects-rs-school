import { CHANGE_INDEX_CATEGORY, CHANGE_IS_ADMIN, VIEW_LOGIN_WINDOW } from "../reducers/adminReducer.module";
import { IAction } from "../reducers/cardsReducer.module";

export function viewLoginWindow(condition: boolean): IAction {
  return { type: VIEW_LOGIN_WINDOW, payload: condition }
}

export function changeIsAdmin(condition: boolean): IAction {
  return { type: CHANGE_IS_ADMIN, payload: condition }
}

export function changeIndexCategory(index: number): IAction {
  return { type: CHANGE_INDEX_CATEGORY, payload: index }
}
