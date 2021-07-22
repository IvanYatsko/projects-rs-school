import { useActions } from "../hooks/useActions";
import { IChangeWord } from "./components.module";

export const AdminWordChange: React.FC<IChangeWord> = ({closeChangeWord}: IChangeWord) => {
  const {} = useActions();

  function delWord() {
    closeChangeWord();
  }

  function saveWord() {
    closeChangeWord();
  }

  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close" onClick={delWord}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="admin-category__row">
          <label className="form-label">Word: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="admin-category__row">
          <label className="form-label">Translation: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="admin-category__row">
          <p>Sound:</p>
          <div className="admin-category__row_select">
            <input className="btn btn-outline-success" type="file" />
            <div className="btn btn-outline-success">Select file</div>
            <p>подпись</p>
          </div>
        </div>
        <div className="admin-category__row">
          <p>Image: </p>
          <div className="admin-category__row_select">
            <input className="btn btn-outline-success" type="file" />
            <div className="btn btn-outline-success">Select file</div>
            <p>подпись</p>
          </div>
        </div>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-danger" onClick={closeChangeWord}>Cancel</button>
          <button type="button" className="btn btn-outline-success">Save</button>
        </div>
      </div>
    </div>
  )
}
