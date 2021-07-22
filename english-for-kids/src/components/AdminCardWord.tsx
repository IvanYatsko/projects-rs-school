import { useState } from "react";
import { links } from "../store/reducers/cardsReducer.module";
import { AdminWordChange } from "./AdminWordChange";
import { IAdminCardWord } from "./components.module";


export const AdminCardWord: React.FC<IAdminCardWord> = ({item, index}: IAdminCardWord) => {
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
        <p>WORD: {item.word}</p>
        <p>TRANSLATION: {item.translation}</p>
        <p>SOUND FILE: {item.audioSrc}</p>
        <p>IMAGE:</p>
        <img src={`${links.static}${item.image}`} alt="card" />
        <button type="button" className="btn btn-outline-success" onClick={() => setChangeWord(true)}>Change</button>
      </div>
    </div>
    :
    <AdminWordChange closeChangeWord={closeChange} item={item} index={index} />
    }
    </>
  )
}
