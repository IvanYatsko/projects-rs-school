import { useActions } from "../hooks/useActions";
import { IChangeCategory } from "./components.module"

export const AdminCategoryChange: React.FC<IChangeCategory> = ({closeChangeCategory, item = '', index}: IChangeCategory) => {
  const {deleteCategory} = useActions();

  function delCategory() {
    if (index !== undefined) {
      deleteCategory(index);
    }
    closeChangeCategory();
  }

  function saveCategory() {
    if (index !== undefined) {

    }
    closeChangeCategory();
  }

  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close" onClick={delCategory}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="mb-3">
          <label className="form-label">Category Name: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-danger" onClick={closeChangeCategory}>Cancel</button>
          <button type="button" className="btn btn-outline-success" onClick={saveCategory}>Save</button>
        </div>
      </div>
    </div>
  )
}
