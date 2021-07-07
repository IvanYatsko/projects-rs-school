import { useTypedSelector } from "../hooks/useTypedSelector"
import { NavLink } from "react-router-dom";
import { useActions } from "../hooks/useActions";

export const BurgerMenu: React.FC = () => {
  const {categoryCards} = useTypedSelector(state => state.cards);
  const {chooseMainPage, chooseStatisticPage, chooseCategoryPage} = useActions();

  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-list__item">
          <NavLink to="/" className="menu-list__link text text-button text-white" onClick={chooseMainPage}>Main</NavLink>
        </li>
        {categoryCards.map((item, index) => {
          return (
          <li key={index} className="menu-list__item">
            <NavLink to="/category" className="menu-list__link text text-button text-white" onClick={chooseCategoryPage}>{item}</NavLink>
          </li>)
          })
        }
        <li className="menu-list__item">
          <NavLink to="/statistics" className="menu-list__link text text-button text-white" onClick={chooseStatisticPage}>Statistics</NavLink>
        </li>


      </ul>
    </nav>
  )
}
