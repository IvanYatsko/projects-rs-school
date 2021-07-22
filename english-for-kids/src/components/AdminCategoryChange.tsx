import { useActions } from "../hooks/useActions";
import { IChangeCategory, IInputValue } from "./components.module"
import { useInputValue } from "./ModalWindow";

export const AdminCategoryChange: React.FC<IChangeCategory> = ({closeChangeCategory, item = '', index}: IChangeCategory) => {
  const { deleteCategory, createCategory, updateCategory } = useActions();
  const input: IInputValue = useInputValue(item);

  function delCategory() {
    if (index !== undefined) {
      deleteCategory(index);
    }
    closeChangeCategory();
  }

  function saveCategory() {
    if (input.value) {
      if (index === undefined) {
        createCategory(input.value);
      } else {
        updateCategory(index, input.value);
      }
    closeChangeCategory();
    }
  }

  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close" onClick={delCategory}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="mb-3">
          <label className="form-label">Category Name: </label>
          <input type="text" className="form-control" {...input} />
        </div>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-danger" onClick={closeChangeCategory}>Cancel</button>
          <button type="button" className="btn btn-outline-success" onClick={saveCategory}>Save</button>
        </div>
      </div>
    </div>
  )
}
