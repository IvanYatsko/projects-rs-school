import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { Card } from "./CardWord"
import { useHistory } from "react-router-dom"

export const Category: React.FC = () => {
  const {listCards,indexCategory} = useTypedSelector(state => state.cards);
  const history = useHistory();
  if (indexCategory === null) { // ! - не подходит, т.к. indexCategory может быть = 0
    history.push('/');
    throw Error('Do not choose category');
  }

  return (
  <>
  <main className="main">
    <div className="main-container">
      {listCards[indexCategory].map((item, index) => <Card item={item} index={index} key={index} />)}
    </div>
  </main>
  </>
  )
}
