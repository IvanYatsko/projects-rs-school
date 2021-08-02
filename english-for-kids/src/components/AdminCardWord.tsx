import { useState } from "react";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { links } from "../store/reducers/cardsReducer.module";
import { AdminWordChange } from "./AdminWordChange";
import { listenAudio } from "./CardWord";
import { IAdminCardWord } from "./components.module";

export const AdminCardWord: React.FC<IAdminCardWord> = ({
  item,
  index,
}: IAdminCardWord) => {
  const [getChangeWord, setChangeWord] = useState(false);
  const { indexCategory } = useTypedSelector((state) => state.admin);
  const { deleteCard } = useActions();

  function closeChange() {
    setChangeWord(false);
  }

  return (
    <>
      {!getChangeWord ? (
        <div className="card admin-category">
          <div className="card-body admin-category__body">
            <button
              type="button"
              className="close admin-category__cross"
              aria-label="Close"
              onClick={() => deleteCard(indexCategory as number, index)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <p>WORD: {item.word}</p>
            <p>TRANSLATION: {item.translation}</p>
            <p
              className="admin-category__sound"
              onClick={() => item.audioSrc && listenAudio(item.audioSrc)}
            >
              SOUND FILE: {item.audioSrc}
              <img
                className="admin-category__sound_img"
                src={`${links.static}image/note.png`}
                alt="note"
              />
            </p>
            <p>IMAGE:</p>
            <img
              src={`${item.image.startsWith("data:") ? "" : links.static}${
                item.image ? item.image : "img/unknown-img.jpg"
              }`}
              alt="card"
            />
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => setChangeWord(true)}
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <AdminWordChange
          closeChangeWord={closeChange}
          item={item}
          index={index}
        />
      )}
    </>
  );
};
