import React from "react"
import { NavLink, useLocation } from "react-router-dom";
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BurgerMenu } from "./BurgerMenu"
import { ADMIN } from "./components.module";

export const Header: React.FC = () => {
  const { viewLeftMenu, changeModeGame, falseLeftMenu, chooseMainPage, changeIsAdmin, setFetchAuth } = useActions();
  const { isShowLeftMenu, isModePlay } = useTypedSelector(state => state.cards);
  const { pathname } = useLocation();

  function leaveAdminPage() {
    chooseMainPage();
    changeIsAdmin(false);
    setFetchAuth(false);
    sessionStorage.setItem('isAdmin', '');
  }

  function valueFalseLeftMenu() {
    if (isShowLeftMenu) {
      falseLeftMenu();
    }
  }

  return (
    <>
    {
    pathname.includes(ADMIN)
    ?
    <div className="header-admin">
      <ul>
        <li className="text text-title text-white">
          <NavLink to='/admin'>Categories</NavLink>
        </li>
        <li className="text text-title text-white">
          <div>Words</div>
        </li>
      </ul>
      <NavLink to="/" className="button button-transparent text-title" onClick={leaveAdminPage}>Log out</NavLink>
    </div>
    :
    <header className="header" onClick={valueFalseLeftMenu}>
      <div className="header-container">
        <div className={`header-burger ${isShowLeftMenu && 'active'}`} id="header-burger" onClick={viewLeftMenu}>
          <span className="header-burger__span"></span>
        </div>
        <BurgerMenu />
        <label className="switch">
          <input type="checkbox" checked={isModePlay} onChange={changeModeGame} />
          <span className="switch-slider" data-on="Train" data-off="Play"></span>
          <span className="switch-handle"></span>
        </label>
      </div>
    </header>
    }
    </>
  )
}
