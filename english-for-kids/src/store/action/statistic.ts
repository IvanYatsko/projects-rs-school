import {
  CHANGE_STATISTIC_FIELD,
  IFieldItem,
  SORT_STATISTIC_FIELD,
} from '../reducers/statisticReducer.module';

export function changeStatisticField(array: IFieldItem[]) {
  return { type: CHANGE_STATISTIC_FIELD, payload: array };
}
export function sortStatisticField(title: string) {
  return { type: SORT_STATISTIC_FIELD, payload: title };
}
