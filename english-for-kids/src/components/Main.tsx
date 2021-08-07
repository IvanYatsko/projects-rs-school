import React from "react";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { CardCategory } from "./CardCategory";

export const Main: React.FC = () => {
  const { categoryCards, isShowLeftMenu, listCards } = useTypedSelector(
    (state) => state.cards
  );
  const { falseLeftMenu } = useActions();

  function valueFalseLeftMenuInMain() {
    if (isShowLeftMenu) {
      falseLeftMenu();
    }
  }

  return (
    <main className="main" onClick={valueFalseLeftMenuInMain}>
      <div className="main-container">
        {listCards.length && categoryCards.length ? (
          categoryCards.map((item, index) => (
            <CardCategory item={item} key={index} index={index} />
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    </main>
  );
};
