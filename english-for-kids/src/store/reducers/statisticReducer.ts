import { IAction } from "./cardsReducer.module"
import { ADD_STATISTIC_FIELD, IlistStatistic } from "./statisticReducer.module"



const listStatistic: IlistStatistic = {
  field: [],
}

export const statisticReducer = (state: IlistStatistic = listStatistic, action: IAction): IlistStatistic => {
  switch(action.type) {
    case ADD_STATISTIC_FIELD:
      return {...state, field: action.payload}

    default:
      return state;
  }
}
