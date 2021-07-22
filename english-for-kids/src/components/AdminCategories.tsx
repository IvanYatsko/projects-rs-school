import { Redirect } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { AdminCardCategory } from "./AdminCardCategory"
import { AdminCardCreate } from "./AdminCardCreate"

export const AdminCategories: React.FC = () => {
  const {isAdmin} = useTypedSelector(state => state.admin);
  const {categoryCards} = useTypedSelector(state => state.cards);

  if (!isAdmin) {
    return (<Redirect to="/" />)
  }

  return (
    <main className="main">
      <div className="main-container">
        {
          categoryCards.map((item, index) => <AdminCardCategory item={item} key={index} index={index} />)
        }
        {<AdminCardCreate />}
      </div>
    </main>
  )
}
