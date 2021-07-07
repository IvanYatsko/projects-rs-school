import React from "react"
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { FIRST_ELEM, ICardCategory } from "./components.module";
import { NavLink } from "react-router-dom";

export const CardCategory: React.FC<ICardCategory> = ({item, index}: ICardCategory) => {
  const {listCards} = useTypedSelector(state => state.cards);
  const {chooseCategoryPage} = useActions();

  return (
    <>
    <NavLink to="/category" className="main-category" onClick={chooseCategoryPage.bind(null, index)}>
      <div className="main-card main-category__image">
        <img className="category-image" src={`./assets/${listCards[index][FIRST_ELEM].image}`} alt="category" />
      </div>
      <div className="main-category__title">
        <p className="text text-number">{item}</p>
      </div>
    </NavLink>
    </>
  )
}
