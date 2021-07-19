import {  CHANGE_ARR_CARDS, CHANGE_ARR_STARS, CHANGE_STATUS_GAME, CHOOSE_CATEGORY_PAGE, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, FALSE_LEFT_MENU, ICards, Stars, VIEW_LEFT_MENU } from "../reducers/cardsReducer.module";

export function chooseMainPage() {
    return { type: CHOOSE_MAIN_PAGE }
}
export function chooseStatisticPage() {
    return { type: CHOOSE_STATISTIC_PAGE }
}
export function chooseCategoryPage(index: number) {
    return { type: CHOOSE_CATEGORY_PAGE, payload: index }
}
export function viewLeftMenu() {
    return { type: VIEW_LEFT_MENU }
}
export function falseLeftMenu() {
    return { type: FALSE_LEFT_MENU }
}
export function changeModeGame() {
    return { type: CHANGE_STATUS_GAME }
}
export function changeArrCards(arr: ICards[]) {
    return { type: CHANGE_ARR_CARDS, payload: arr}
}
export function changeArrStars(arr: Stars[]) {
    return { type: CHANGE_ARR_STARS, payload: arr}
}
