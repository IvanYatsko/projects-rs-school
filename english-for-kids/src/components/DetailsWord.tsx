import React from "react";

import { IDetailsWord } from "./components.module";

export const DetailsWord: React.FC<IDetailsWord> = ({
  item,
  index,
}: IDetailsWord) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{item.category}</td>
      <td>{item.word}</td>
      <td>{item.translation}</td>
      <td>{item.trained}</td>
      <td>{item.correct}</td>
      <td>{item.incorrect}</td>
      <td>{item.errors}</td>
    </tr>
  );
};
