import { ADD_STATISTIC_FIELD, IFieldItem } from "../reducers/statisticReducer.module";


export function addStatisticField(array: IFieldItem[]) {
  return { type: ADD_STATISTIC_FIELD, payload: array }
}
