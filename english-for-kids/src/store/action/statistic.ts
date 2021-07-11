import { CHANGE_STATISTIC_FIELD, IFieldItem } from "../reducers/statisticReducer.module";


export function changeStatisticField(array: IFieldItem[]) {
  return { type: CHANGE_STATISTIC_FIELD, payload: array };
}
