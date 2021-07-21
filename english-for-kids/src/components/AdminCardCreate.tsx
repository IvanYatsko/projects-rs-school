import { links } from "../store/reducers/cardsReducer.module"

export const AdminCardCreate: React.FC = () => {
  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <h3>Animals</h3>
        <div className="row admin-category__buttons">
          <img className="admin-category__plus" src={`${links.static}image/plus.svg`} alt="plus" />
        </div>
      </div>
    </div>
  )
}
