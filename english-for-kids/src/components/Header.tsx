import React from "react"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BurgerMenu } from "./BurgerMenu"

export const Header: React.FC = () => {
  const {viewLeftMenu,changeModeGame} = useActions();
  const {isShowLeftMenu} = useTypedSelector(state => state.cards);


  return (
    <header className="header">
    <div className="header-container">
      <div className={`header-burger ${isShowLeftMenu && 'active'}`} id="header-burger" onClick={viewLeftMenu}>
        <span className="header-burger__span"></span>
      </div>
      <BurgerMenu />
      <label className="switch">
        <input type="checkbox" onChange={changeModeGame} />
        <span className="switch-slider" data-on="Train" data-off="Play"></span>
        <span className="switch-handle"></span>
      </label>
    </div>
  </header>
  )
}
