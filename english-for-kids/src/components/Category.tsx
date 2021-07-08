import React, {useEffect,useState} from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { Card, listenAudio } from "./CardWord"
import { useHistory } from "react-router-dom"
import { useActions } from "../hooks/useActions"

export const Category: React.FC = () => {
  const {listCards,indexCategory,arrGameWords,isModePlay,arrStars} = useTypedSelector(state => state.cards);
  const history = useHistory();
  const {changeArrCards} = useActions();
  const [getIsFinish, setIsFinish] = useState(false);

  function changeDisplayState() {
    setIsFinish(true);
  }

  function sayWord(audioSrc: string) {
    setTimeout(() => listenAudio(audioSrc), 500);
  }

  useEffect(() => {
    if (arrGameWords.length) {
      sayWord(arrGameWords[0].audioSrc);
    }
  }, [arrGameWords]);

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
      sayWord(arrGameWords[0].audioSrc);

    }
  }

  return (
  <>
  <main className={`main ${getIsFinish && "disabled"}`}>
    <div className="main-star">
      {arrStars.map((item, index) => {
        return (<img src={`./assets/img/${item}.svg`} alt={`${index}`} key={index} />);
      })}
    </div>
    <div className="main-container">
      {listCards[indexCategory].map((item, index) => <Card changeDisplayState={changeDisplayState} item={item} key={index} />)}
    </div>
    <button className={`button button-green ${arrGameWords.length && 'button-circle'} text text-title  ${!isModePlay && 'disabled'}`} onClick={clickButton}>
    {(arrGameWords.length)? <img src="./assets/img/repeat.svg" alt="repeat" /> : 'Start Game'}
    </button>
  </main>
  {
    getIsFinish && !arrStars.filter((elem) => elem === 'star').length &&
    <div className="position">
      <img src="./assets/img/success.jpg" alt="success" />
    </div>
  }
  {
    getIsFinish && arrStars.filter((elem) => elem === 'star').length &&
    <div className="position">
      <h2>Errors: {arrStars.filter((elem) => elem === 'star').length}</h2>
      <img src="./assets/img/failure.jpg" alt="failure" />
    </div>
  }
  </>
  )
}
