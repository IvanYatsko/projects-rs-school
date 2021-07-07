import { cardsReducer } from "./cardsReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    cards: cardsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
