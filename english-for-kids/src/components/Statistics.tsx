import React from "react"
import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { listCards } from "../store/reducers/cardsReducer";
import { IFieldItem } from "../store/reducers/statisticReducer.module";
import { DetailsWord } from "./DetailsWord"

export function createArrField(): IFieldItem[] {
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

export const Statistics: React.FC = () => {
  const newArrField: IFieldItem[] = createArrField();

  const {addStatisticField} = useActions();
  const {field} = useTypedSelector(state => state.statistic);

  useEffect(() => {
    addStatisticField(newArrField);
  }, []);

  return (
  <>
  <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Word</th>
        <th scope="col">Translation</th>
        <th scope="col">Trained</th>
        <th scope="col">Correct</th>
        <th scope="col">Incorrect</th>
        <th scope="col">Errors, %</th>
      </tr>
    </thead>
    <tbody>
      {field.map((item, index) => <DetailsWord item={item} index={index} key={index} /> ) }
    </tbody>
  </table>
  </>
  )
}
