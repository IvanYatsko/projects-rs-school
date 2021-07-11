import React from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { StatisticTitle, VALUE_ZERO } from "../store/reducers/statisticReducer.module";
import { DetailsWord } from "./DetailsWord";

export const Statistics: React.FC = () => {
  const {field} = useTypedSelector(state => state.statistic);
  const {sortStatisticField,changeStatisticField} = useActions();

  function listenTitle(title: string) {
    sortStatisticField(title);
  }

  function resetField() {
    field.forEach(item => {
      item.trained = VALUE_ZERO;
      item.incorrect = VALUE_ZERO;
      item.correct = VALUE_ZERO;
      item.errors = VALUE_ZERO;
    })
    changeStatisticField(field);
  }

  return (
  <>
  <main className="main">
    <button type="button" className="btn btn-outline-primary button-reset" onClick={resetField}>Reset</button>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.CATEGORY)}>Category</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.WORD)}>Word</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.TRANSLATION)}>Translation</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.TRAINED)}>Trained</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.CORRECT)}>Correct</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.INCORRECT)}>Incorrect</th>
          <th scope="col" onClick={() => listenTitle(StatisticTitle.ERRORS)}>Errors, %</th>
        </tr>
      </thead>
      <tbody>
        {field.map((item, index) => <DetailsWord item={item} index={index} key={index} /> ) }
      </tbody>
    </table>
  </main>
  </>
  )
}
