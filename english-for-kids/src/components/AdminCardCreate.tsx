import { useState } from "react";

import { links } from "../store/reducers/cardsReducer.module";
import { AdminCategoryChange } from "./AdminCategoryChange";

export const AdminCardCreate: React.FC = () => {
  const [getChange, setChange] = useState(false);

  function closeChangeCategory(): void {
    setChange(false);
  }

  return (
    <>
      {getChange && (
        <AdminCategoryChange closeChangeCategory={closeChangeCategory} />
      )}
      <div className="card admin-category">
        <div
          className="card-body admin-category__body"
          onClick={() => setChange(true)}
        >
          <h3>Animals</h3>
          <div className="row admin-category__buttons">
            <img
              className="admin-category__plus"
              src={`${links.static}image/plus.svg`}
              alt="plus"
            />
          </div>
        </div>
      </div>
    </>
  );
};
