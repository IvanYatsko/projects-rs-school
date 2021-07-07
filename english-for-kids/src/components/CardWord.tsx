import React, {useState} from "react"
import { listcards } from "../cards";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ICards } from "../store/reducers/cardsReducer.module";
import { ICard } from "./components.module"

function listenAudio(audioSrc: string): void {
  const src = `./assets/${audioSrc}`;
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

export const Card: React.FC<ICard> = ({item, index}: ICard) => {
  const [getRotate, setRotate] = useState(false);
  const {isModePlay} = useTypedSelector(state => state.cards);

  function listenCard(item: ICards) {
    if (isModePlay) {

    } else {
      listenAudio(item.audioSrc)
    }
  }

  return (
    <>
    <div className={`main-card__container ${getRotate && 'flipped'}`} onMouseLeave={setRotate.bind(null, false)}>
      <div className="main-card">
        <div className="main-category main-card__front">
          <div className={`main-card main-category__image ${isModePlay && 'play'}`}>
            <img className="category-image" src={`./assets/${item.image}`} alt="category" onClick={listenCard.bind(null, item)} />
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
