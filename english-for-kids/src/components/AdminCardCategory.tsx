import { useState } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AdminCategoryChange } from "./AdminCategoryChange";
import { ICardCategory } from "./components.module";

export const AdminCardCategory: React.FC<ICardCategory> = ({item, index}: ICardCategory) => {
  const [getChangeCategory, setChangeCategory] = useState(false);
  const {listCards} = useTypedSelector(state => state.cards);

  return (
    <>
    {
    !getChangeCategory
    ?
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h3>{item}</h3>
        <p>WORDS: {listCards[index].length}</p>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-success" onClick={() => setChangeCategory(true)}>Update</button>
          <button type="button" className="btn btn-outline-success">Words</button>
        </div>
      </div>
    </div>
    :
    <AdminCategoryChange />
    }
    </>
  )
}
