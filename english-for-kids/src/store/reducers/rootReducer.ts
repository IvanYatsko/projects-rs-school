import { combineReducers } from 'redux';

import { cardsReducer } from './cardsReducer';
import { statisticReducer } from './statisticReducer';
import { adminReducer } from './adminReducer';

export const rootReducer = combineReducers({
  cards: cardsReducer,
  statistic: statisticReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
