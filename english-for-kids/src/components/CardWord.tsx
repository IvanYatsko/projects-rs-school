import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ICards, Stars } from "../store/reducers/cardsReducer.module";
import { Counter, ICard } from "./components.module"

export function listenAudio(audioSrc: string): void {
  const src = `./assets/${audioSrc}`;
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

export const Card: React.FC<ICard> = ({item, changeDisplayState}: ICard) => {
  const [getRotate, setRotate] = useState(false);
  const [getBlur, setBlur] = useState(false);
  const history = useHistory();
  const {changeArrCards,changeArrStars,chooseMainPage,changeModeGame,changeStatisticField} = useActions();
  const {isModePlay,arrGameWords,arrStars} = useTypedSelector(state => state.cards);
  const {field} = useTypedSelector(state => state.statistic);

  function eventCounter(counter: string) {
    const changeField = field.map(elem => {
      if (elem.word === item.word) {
        switch (counter) {
          case Counter.Trained:
            elem.trained++;
            return elem;
          case Counter.Correct:
            elem.correct++;
            elem.errors = Math.round((100/(elem.correct + elem.incorrect) * elem.correct));
            return elem;
          case Counter.Incorrect:
            elem.incorrect++;
            elem.errors = Math.round((100/(elem.correct + elem.incorrect) * elem.correct));
            return elem;
          case Counter.Errors:
            elem.errors++;
            return elem;
        }
      }
      return elem;
    })
    return changeField;
  }

  function finishGame() {
    if (!arrStars.filter((elem) => elem === 'star').length) {
      listenAudio('audio/success.mp3');
    } else {
      listenAudio('audio/failure.mp3');
    }
    setTimeout(() => {
      history.push('/');
      changeArrStars([]);
      chooseMainPage();
      changeModeGame();
    },3000)
  }

  function listenCard(item: ICards) {
    if (isModePlay) {
      if (arrGameWords.length) {
        if (item.audioSrc === arrGameWords[0].audioSrc) {
          arrGameWords.shift();
          changeArrCards([...arrGameWords]);
          listenAudio('audio/correct.mp3');
          setBlur(true);
          arrStars.push(Stars.STAR_WIN);
          changeArrStars(arrStars);
          const correctCounter = eventCounter(Counter.Correct);
          changeStatisticField(correctCounter);
          if (!arrGameWords.length) {
            changeDisplayState();
            finishGame();
          }
        } else {
          if (arrGameWords.find(elem => item.word === elem.word)) {
            listenAudio('audio/error.mp3');
            arrStars.push(Stars.STAR);
            changeArrStars(arrStars);
            const inCorrectCounter = eventCounter(Counter.Incorrect);
            changeStatisticField(inCorrectCounter);
          }
        }
      }
    } else {
      listenAudio(item.audioSrc);
      const trainedCounter = eventCounter(Counter.Trained);
      changeStatisticField(trainedCounter);
    }
  }

  return (
    <>
    <div className={`main-card__container ${getRotate && 'flipped'}`} onMouseLeave={setRotate.bind(null, false)}>
      <div className="main-card">
        <div className="main-category main-card__front">
          <div className={`main-card main-category__image ${isModePlay && 'play'}`}>
            <img className={`category-image ${getBlur && 'blur'}`} src={`./assets/${item.image}`} alt="category" onClick={listenCard.bind(null, item)} />
          </div>
          <div className="main-category__title">
            <p className="text text-title" onClick={listenCard.bind(null, item)}>{item.word}</p>
            <img className={`main-category__rotate ${isModePlay && 'disabled'}`} src="./assets/image/rotate.png" alt="rotate" onClick={setRotate.bind(null, true)} />
          </div>
        </div>
        <div className="main-card__back text text-title">{item.translation}</div>
      </div>
    </div>
    </>
  )
}
