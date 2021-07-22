import { CHANGE_INDEX_CATEGORY, CHANGE_IS_ADMIN, IAdminState, VIEW_LOGIN_WINDOW } from "./adminReducer.module"
import { IAction } from "./cardsReducer.module"

export const adminState: IAdminState = {
  modalView: false,
  isAdmin: !!sessionStorage.getItem('isAdmin') ?? false,
  indexCategory: null,
}

export const adminReducer = (state: IAdminState = adminState, action: IAction): IAdminState => {
  switch (action.type) {
    case VIEW_LOGIN_WINDOW:
      return { ...state, modalView: action.payload }
    case CHANGE_IS_ADMIN:
      return { ...state, isAdmin: action.payload }
    case CHANGE_INDEX_CATEGORY:
      return { ...state, indexCategory: action.payload }

    default:
      return state;
  }


}
