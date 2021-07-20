import React from "react"
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { CardCategory } from "./CardCategory"
import { ModalWindow } from "./ModalWindow";

export const Main: React.FC = () => {
  const {categoryCards,isShowLeftMenu} = useTypedSelector(state => state.cards);
  const {modalView} = useTypedSelector(state => state.admin);
  const {falseLeftMenu} = useActions();

  function valueFalseLeftMenuInMain() {
    if (isShowLeftMenu) {
      falseLeftMenu();
    }
  }

  return (
  <>
  <main className="main" onClick={valueFalseLeftMenuInMain}>
    <div className="main-container">
      {categoryCards.map((item, index) => <CardCategory item={item} key={index} index={index} />)}
    </div>
    {modalView && <ModalWindow />}
  </main>
  </>
  )
}
