import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { DetailsWord } from "./DetailsWord";

export const Statistics: React.FC = () => {
  const {field} = useTypedSelector(state => state.statistic);

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
