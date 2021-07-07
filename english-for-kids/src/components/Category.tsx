import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { Card } from "./CardWord"
import { useHistory } from "react-router-dom"
import { useActions } from "../hooks/useActions"

export const Category: React.FC = () => {
  const {listCards,indexCategory,arrGameWords} = useTypedSelector(state => state.cards);
  const history = useHistory();
  const {changeArrCards} = useActions();

  if (indexCategory === null) { // ! - не подходит, т.к. indexCategory может быть = 0
    history.push('/');
    return (<></>);
  }

  function clickButton() {
    if (!arrGameWords.length) {
      if (indexCategory === null) {
        return (<></>);
      }
      let newRandomArr = [...listCards[indexCategory]];
      newRandomArr.sort(() => Math.random() - 0.5);
      changeArrCards(newRandomArr);
    } else {

    }
  }

  return (
  <>
  <main className="main">
    <div className="main-container">
      {listCards[indexCategory].map((item, index) => <Card item={item} index={index} key={index} />)}
    </div>
    <button className={`button button-green ${arrGameWords.length && 'button-circle'} text text-title`} onClick={clickButton}>Start Game</button>
  </main>
  </>
  )
}
