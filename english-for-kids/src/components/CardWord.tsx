import React from "react"
import { ICard } from "./components.module"

export const Card: React.FC<ICard> = ({item, index}: ICard) => {
  console.log(item);


  return (
    <>
    <div className="main-card__container">
      <div className="main-card">
        <div className="main-category main-card__front">
          <div className="main-card main-category__image">
            <img className="category-image" src={`./assets/${item.image}`} alt="category" />
          </div>
          <div className="main-category__title">
            <p className="text text-title">{item.word}</p>
            <img className="main-category__rotate" src="./assets/image/rotate.png" alt="rotate" />
          </div>
        </div>
        <div className="main-card__back text text-title">{item.translation}</div>
      </div>
    </div>
    </>
  )
}
