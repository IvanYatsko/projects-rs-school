import { CHOOSE_CATEGORY_PAGE, CHOOSE_MAIN_PAGE, CHOOSE_STATISTIC_PAGE, VIEW_LEFT_MENU } from "../reducers/cardsReducer.module";

export function chooseMainPage() {
    return { type: CHOOSE_MAIN_PAGE }
}
export function chooseStatisticPage() {
    return { type: CHOOSE_STATISTIC_PAGE }
}
export function chooseCategoryPage() {
    return { type: CHOOSE_CATEGORY_PAGE }
}
export function viewLeftMenu() {
    return { type: VIEW_LEFT_MENU }
}
