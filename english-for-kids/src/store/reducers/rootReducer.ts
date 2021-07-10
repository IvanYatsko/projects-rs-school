import { cardsReducer } from "./cardsReducer";
import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";

export const rootReducer = combineReducers({
    cards: cardsReducer,
    statistic: statisticReducer,
})

export type RootState = ReturnType<typeof rootReducer>
