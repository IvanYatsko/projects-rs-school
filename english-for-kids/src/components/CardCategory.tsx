import React from "react"
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { FIRST_ELEM, ICardCategory } from "./components.module";
import { NavLink } from "react-router-dom";
import { links } from "../store/reducers/cardsReducer.module";

export const CardCategory: React.FC<ICardCategory> = ({item, index}: ICardCategory) => {
  const {listCards, isModePlay} = useTypedSelector(state => state.cards);
  const {chooseCategoryPage} = useActions();

  return (
    <>
    <NavLink to="/category" className={`main-category ${isModePlay && 'play'}`} onClick={chooseCategoryPage.bind(null, index)}>
      <div className="main-card main-category__image">
        <img className="category-image" src={`${listCards[index] && listCards[index][FIRST_ELEM]?.image.startsWith('data:') ? '' : links.static}${listCards[index][FIRST_ELEM]?.image ? listCards[index][FIRST_ELEM].image : 'img/unknown-img.jpg'}`} alt="category" />
      </div>
      <div className="main-category__title">
        <p className="text text-number">{item}</p>
      </div>
    </NavLink>
    </>
  )
}
