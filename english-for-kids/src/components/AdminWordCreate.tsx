import { useState } from "react"
import { links } from "../store/reducers/cardsReducer.module"
import { AdminWordChange } from "./AdminWordChange";

export const AdminWordCreate: React.FC = () => {
  const [getChange, setChange] = useState(false);

  function closeChange() {
    setChange(false);
  }

  return (
    <>
      {getChange && <AdminWordChange closeChangeWord={closeChange} />}
      <div className="card admin-category">
        <div className="card-body admin-category__body" onClick={() => setChange(true)}>
          <h3>Animals</h3>
          <div className="row admin-category__buttons">
            <img className="admin-category__plus" src={`${links.static}image/plus.svg`} alt="plus" />
          </div>
        </div>
      </div>
    </>
  )
}
