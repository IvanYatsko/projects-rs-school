import { useTypedSelector } from "../hooks/useTypedSelector"
import { NavLink } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { typePage } from "../store/reducers/cardsReducer.module";

export const BurgerMenu: React.FC = () => {
  const {categoryCards, page, indexCategory} = useTypedSelector(state => state.cards);
  const {chooseMainPage, chooseStatisticPage, chooseCategoryPage} = useActions();

  return (
    <nav className="menu">
      <ul className="menu-list">
        <li className="menu-list__item">
          <NavLink to="/" className={`menu-list__link ${page === typePage.MAIN_PAGE && 'choose'} text text-button text-white`} onClick={chooseMainPage}>Main</NavLink>
        </li>
        {categoryCards.map((item, index) => {
          return (
          <li key={index} className="menu-list__item">
            <NavLink to="/category" className={`menu-list__link ${page === typePage.CATEGORIES_PAGE && indexCategory === index && 'choose'} text text-button text-white`} onClick={chooseCategoryPage.bind(null, index)}>{item}</NavLink>
          </li>)
          })
        }
        <li className="menu-list__item">
          <NavLink to="/statistics" className={`menu-list__link ${page === typePage.STATISTIC_PAGE && 'choose'} text text-button text-white`} onClick={chooseStatisticPage}>Statistics</NavLink>
        </li>


      </ul>
    </nav>
  )
}
