import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useActions } from "../hooks/useActions";
import { ADMIN, IInputValue } from "./components.module";

export function useInputValue(defaultValue: string = ""): IInputValue {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value),
  };
}

export const ModalWindow: React.FC = () => {
  const loginInput: IInputValue = useInputValue();
  const passwordInput: IInputValue = useInputValue();
  const { viewLoginWindow, changeIsAdmin, setFetchAuth, chooseMainPage } =
    useActions();
  const [getPrompt, setPrompt] = useState(false);
  const history = useHistory();

  function changeRoute(event: React.FormEvent): void {
    event.preventDefault();
    if (loginInput.value === ADMIN && passwordInput.value === ADMIN) {
      changeIsAdmin(true);
      setFetchAuth(true);
      history.push("/admin");
      setPrompt(false);
      sessionStorage.setItem("isAdmin", "1");
    } else {
      setPrompt(true);
      chooseMainPage();
    }
    viewLoginWindow(false);
  }

  return (
    <div className="modal" onSubmit={changeRoute}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => viewLoginWindow(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Login</label>
                <input type="text" className="form-control" {...loginInput} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...passwordInput}
                />
              </div>
              <div
                className={`mb-3 row ${
                  getPrompt && "text-danger font-weight-bold"
                }`}
              >
                <div className="form-text col-sm-5">Login: admin</div>
                <div className="form-text col-sm-5">Password: admin</div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => viewLoginWindow(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
