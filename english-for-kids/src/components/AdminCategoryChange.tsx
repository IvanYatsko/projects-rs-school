export const AdminCategoryChange: React.FC = () => {
  return (
    <div className="card admin-category">
      <div className="card-body admin-category__body">
        <button type="button" className="close admin-category__cross" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="mb-3">
          <label className="form-label">Category Name: </label>
          <input type="text" className="form-control" />
        </div>
        <div className="row admin-category__buttons">
          <button type="button" className="btn btn-outline-danger">Cancel</button>
          <button type="button" className="btn btn-outline-success">Save</button>
        </div>
      </div>
    </div>
  )
}
