import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IChangeWord, IInputValue } from "./components.module";
import { useInputValue } from "./ModalWindow";

export const AdminWordChange: React.FC<IChangeWord> = ({closeChangeWord, item, index}: IChangeWord) => {
  const { indexCategory } = useTypedSelector(state => state.admin);
  const { deleteCard, createCard, updateCard } = useActions();
  const wordInput: IInputValue = useInputValue(item?.word);
  const translationInput: IInputValue = useInputValue(item?.translation);
  const [ getSound, setSound ] = useState(item?.audioSrc ?? '');
  const [ getImage, setImage ] = useState(item?.image ?? '');

  function onloadFile(file: File, setValueState: React.Dispatch<React.SetStateAction<string>>): void {
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setValueState(res);
    };
    reader.readAsDataURL(file);
  }

  function onloadSound(event: React.ChangeEvent<HTMLInputElement>): void {
    const file: File  = (event.target.files as FileList)[0];
    onloadFile(file, setSound);
  }

  function onloadImg(event: React.ChangeEvent<HTMLInputElement>): void {
    const file: File  = (event.target.files as FileList)[0];
    onloadFile(file, setImage);
  }

  function delWord() {
    if (index !== undefined && indexCategory !== null) {
      deleteCard(indexCategory, index);
    }
    closeChangeWord();
  }

  function saveWord() {
    if (wordInput.value && translationInput.value) {
      const data = {
        word: wordInput.value,
        translation: translationInput.value,
        image: getImage,
        audioSrc: getSound,
      };
      if (index === undefined && indexCategory !== null) {
        createCard(indexCategory, data);
      } else if (index !== undefined && indexCategory !== null) {
        updateCard(indexCategory, index, data);
      }
    closeChangeWord();
    }
  }

  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close" onClick={delWord}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="admin-category__row">
          <label className="form-label">Word: </label>
          <input type="text" className="form-control" {...wordInput} />
        </div>
        <div className="admin-category__row">
          <label className="form-label">Translation: </label>
          <input type="text" className="form-control" {...translationInput} />
        </div>
        <div className="admin-category__row">
          <p>Sound:</p>
          <div className="admin-category__row_select">
            <input className="btn btn-outline-success" type="file" onChange={onloadSound} />
            <div className="btn btn-outline-success">Select file</div>
            <p>{getSound}</p>
          </div>
        </div>
        <div className="admin-category__row">
          <p>Image: </p>
          <div className="admin-category__row_select">
            <input className="btn btn-outline-success" type="file" onChange={onloadImg} />
            <div className="btn btn-outline-success">Select file</div>
            <p>{getImage}</p>
          </div>
        </div>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-danger" onClick={closeChangeWord}>Cancel</button>
          <button type="button" className="btn btn-outline-success" onClick={saveWord}>Save</button>
        </div>
      </div>
    </div>
  )
}
