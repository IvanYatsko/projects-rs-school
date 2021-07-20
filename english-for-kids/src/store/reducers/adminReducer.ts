import { IAdminState, VIEW_LOGIN_WINDOW } from "./adminReducer.module"
import { IAction } from "./cardsReducer.module"

export const adminState: IAdminState = {
  modalView: false,
}

export const adminReducer = (state: IAdminState = adminState, action: IAction): IAdminState => {
  switch (action.type) {
    case VIEW_LOGIN_WINDOW:
      return { ...state, modalView: true }

    default:
      return state;
  }


}
