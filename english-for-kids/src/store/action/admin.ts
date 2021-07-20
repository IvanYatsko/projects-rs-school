import { VIEW_LOGIN_WINDOW } from "../reducers/adminReducer.module";
import { IAction } from "../reducers/cardsReducer.module";

export function viewLoginWindow(): IAction {
  return { type: VIEW_LOGIN_WINDOW }
}
