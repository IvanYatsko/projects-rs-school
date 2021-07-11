import { listCards } from "./cardsReducer";
import { IAction } from "./cardsReducer.module";
import { CHANGE_STATISTIC_FIELD, IFieldItem, IlistStatistic, KeyStatistic, SORT_STATISTIC_FIELD, StatisticTitle } from "./statisticReducer.module";


export function createArrField(): IFieldItem[] {
  const savedStatistics: IFieldItem[] = JSON.parse(localStorage.getItem('arrStatistic') || '[]') as IFieldItem[];
  if (!savedStatistics.length) {
    const arrField: IFieldItem[] = [];
    listCards.listCards.forEach((item, index) => {
      item.forEach((elem) => {
        arrField.push({
          category: listCards.categoryCards[index],
          word: elem.word,
          translation: elem.translation,
          trained: 0,
          correct: 0,
          incorrect: 0,
          errors: 0,
        })
      })
    })
    return arrField;
  } else {
    return savedStatistics;
  }

}

const listStatistic: IlistStatistic = {
  field: createArrField(),
  sort: {
    category: true,
    word: true,
    translation: true,
    trained: true,
    correct: true,
    incorrect: true,
    errors: true,
  }
}

export const statisticReducer = (state: IlistStatistic = listStatistic, action: IAction): IlistStatistic => {
  switch(action.type) {
    case CHANGE_STATISTIC_FIELD:
      return {...state, field: action.payload}
    case SORT_STATISTIC_FIELD:
      const key: KeyStatistic = action.payload;
      let sortArray: IFieldItem[] = [];
      if (state.sort[key]) {
        if (key === StatisticTitle.CATEGORY || key === StatisticTitle.TRANSLATION || key === StatisticTitle.WORD) {
          sortArray = state.field.sort((a, b) => a[key] < b[key] ? - 1 : a[key] > b[key] ? 1 : 0);
        } else {
          sortArray = state.field.sort((a, b) => Number(a[key]) - Number(b[key]));
        }
      } else {
        if (key === StatisticTitle.CATEGORY || key === StatisticTitle.TRANSLATION || key === StatisticTitle.WORD) {
          sortArray = state.field.sort((a, b) => a[key] > b[key] ? - 1 : a[key] < b[key] ? 1 : 0);
        } else {
          sortArray = state.field.sort((a, b) => Number(b[key]) - Number(a[key]));
        }
      }
      state.sort[key] = !state.sort[key];
      return {...state, field: sortArray, sort: state.sort}

    default:
      return state;
  }
}
