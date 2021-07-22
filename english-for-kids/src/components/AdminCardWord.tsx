import { useState } from "react";
import { links } from "../store/reducers/cardsReducer.module";
import { AdminWordChange } from "./AdminWordChange";


export const AdminCardWord: React.FC = () => {
  const [getChangeWord, setChangeWord] = useState(false);

  function closeChange() {
    setChangeWord(false);
  }

  return (
    <>
    {
    !getChangeWord
    ?
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <p>WORD: lalala</p>
        <p>TRANSLATION: lalala</p>
        <p>SOUND FILE: lalala</p>
        <p>IMAGE:</p>
        <img src={`${links.static}img/apple.jpg`} alt="" />
        <button type="button" className="btn btn-outline-success" onClick={() => setChangeWord(true)}>Change</button>
      </div>
    </div>
    :
    <AdminWordChange closeChangeWord={closeChange} />
    }
    </>
  )
}
