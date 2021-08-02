import React from "react";
import { NavLink } from "react-router-dom";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { FIRST_ELEM, ICardCategory } from "./components.module";
import { links } from "../store/reducers/cardsReducer.module";
import { WORDPLAY } from "../store/reducers/statisticReducer.module";

export const CardCategory: React.FC<ICardCategory> = ({
  item,
  index,
}: ICardCategory) => {
  const { listCards, isModePlay } = useTypedSelector((state) => state.cards);
  const { chooseCategoryPage } = useActions();

  return (
    <NavLink
      to="/category"
      className={`main-category ${isModePlay && WORDPLAY}`}
      onClick={() => chooseCategoryPage(index)}
    >
      <div className="main-card main-category__image">
        <img
          className="category-image"
          src={`${
            listCards[index] &&
            listCards[index][FIRST_ELEM]?.image.startsWith("data:")
              ? ""
              : links.static
          }${
            listCards[index][FIRST_ELEM]?.image
              ? listCards[index][FIRST_ELEM].image
              : "img/unknown-img.jpg"
          }`}
          alt="category"
        />
      </div>
      <div className="main-category__title">
        <p className="text text-number">{item}</p>
      </div>
    </NavLink>
  );
};
