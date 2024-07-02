// this is the Form we use in the React Modal

import "./Form.css";

export default function Form({
  inputValue,
  setInputValue,
  closeModal,
  handleSubmit,
  className,
  handleCancel,
}) {
  return (
    <div className={className}>
      <h1> New Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="modal_inputDiv">
          <input
            type="text"
            placeholder="Input your note..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <div className="apply-cancel">
          <button
            className="cancel"
            onClick={() => handleCancel(setInputValue, closeModal)}
          >
            CANCEL
          </button>
          <button
            className={`apply ${!inputValue ? "disabled" : ""}`}
            type="submit"
            disabled={inputValue ? false : true}
          >
            APPLY
          </button>
        </div>
      </form>
    </div>
  );
}
