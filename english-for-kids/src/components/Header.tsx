import React from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BurgerMenu } from "./BurgerMenu"

export const Header: React.FC = () => {
  const {viewLeftMenu,changeModeGame,falseLeftMenu} = useActions();
  const {isShowLeftMenu,isModePlay} = useTypedSelector(state => state.cards);

  function valueFalseLeftMenu() {
    if (isShowLeftMenu) {
      falseLeftMenu();
    }
  }

  return (
  <header className="header" onClick={valueFalseLeftMenu}>
    <div className="header-container">
      <div className={`header-burger ${isShowLeftMenu && 'active'}`} id="header-burger" onClick={viewLeftMenu}>
        <span className="header-burger__span"></span>
      </div>
      <BurgerMenu />
      <h2>Уважаемый проверяющий, прошу проверить мою работу 22числа!!! буду очень признателен!!!</h2>
      <label className="switch">
        <input type="checkbox" checked={isModePlay} onChange={changeModeGame} />
        <span className="switch-slider" data-on="Train" data-off="Play"></span>
        <span className="switch-handle"></span>
      </label>
    </div>
  </header>
  )
}
