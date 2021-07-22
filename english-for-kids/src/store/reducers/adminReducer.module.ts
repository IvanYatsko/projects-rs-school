export const VIEW_LOGIN_WINDOW = 'VIEW_LOGIN_WINDOW';
export const CHANGE_IS_ADMIN = 'CHANGE_IS_ADMIN';
export const CHANGE_INDEX_CATEGORY = 'CHANGE_INDEX_CATEGORY';
export const GET_IS_ADMIN = 'GET_IS_ADMIN';

export interface IAdminState {
  modalView: boolean;
  isAdmin: boolean;
  indexCategory: null | number;
}
