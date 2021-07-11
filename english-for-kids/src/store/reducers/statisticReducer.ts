import { listCards } from "./cardsReducer";
import { IAction } from "./cardsReducer.module";
import { CHANGE_STATISTIC_FIELD, IFieldItem, IlistStatistic } from "./statisticReducer.module";


export function createArrField(): IFieldItem[] {
  // const savedStatistics: IStatisticsFields[] = JSON.parse(localStorage.getItem('statistics') || '[]') as IStatisticsFields[];
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
}

const listStatistic: IlistStatistic = {
  field: createArrField(),
}

export const statisticReducer = (state: IlistStatistic = listStatistic, action: IAction): IlistStatistic => {
  switch(action.type) {
    case CHANGE_STATISTIC_FIELD:
      return {...state, field: action.payload}

    default:
      return state;
  }
}
