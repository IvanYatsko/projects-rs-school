import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { AdminCardWord } from "./AdminCardWord";
import { AdminWordCreate } from "./AdminWordCreate";

export const AdminWordPage: React.FC = () => {
  const { listCards, categoryCards } = useTypedSelector(state => state.cards);
  const { indexCategory } = useTypedSelector(state => state.admin);

  if (indexCategory === null) {
    return (<Redirect to='/admin' />);
  }

  return (
    <>
    <main className="main">
      <div className="main-container">
        {
          listCards?.length && categoryCards?.length
          ?
          listCards[indexCategory as number].map((item, index) => <AdminCardWord key={index} index={index} item={item} />)
          :
          <div className="d-flex justify-content-center">
            <h2>Loading...</h2>
          </div>
        }
        {<AdminWordCreate />}
      </div>
    </main>
    </>
  )
}
