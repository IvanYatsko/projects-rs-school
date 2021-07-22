export const VIEW_LOGIN_WINDOW = 'VIEW_LOGIN_WINDOW';
export const CHANGE_IS_ADMIN = 'CHANGE_IS_ADMIN';
export const CHANGE_INDEX_CATEGORY = 'CHANGE_INDEX_CATEGORY';

export interface IAdminState {
  modalView: boolean;
  isAdmin: boolean;
  indexCategory: null | number;
}
