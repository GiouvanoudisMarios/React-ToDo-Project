import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import InputSearch from "./InputSearch/InputSearch";
import Selector from "./Selector/Selector";
import Form from "./Form/Form";
import UlistContent from "./UlistContent/UlistContent";
import {
  fetchInitialData,
  handleSubmit,
  handleFilter,
  handleCancel,
} from "./handlers/handleFunctions";
import dark from "../assets/Dark.png";
import light from "../assets/Light.png";
import plusIcon from "../assets/PlusIcon.png";
import "./App.css";
import "./responsiveness/responsive.css";
ReactModal.setAppElement("#root");

export default function App() {
  // db state
  const [toDoList, setToDoList] = useState([]);
  // input for adding new Task state
  const [inputValue, setInputValue] = useState("");
  // selector state
  const [selector, setSelector] = useState("ALL");
  // input to filter and search  state
  const [searchValue, setSearchValue] = useState("");
  // modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // state for dark mode on/off
  const [darkMode, setDarkMode] = useState(false);

  // initialize toDoList based on db.json the first time it runs
  useEffect(() => {
    fetchInitialData(setToDoList);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);
  // modal on/off
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="head">
        <h1 className="head_title">TODO LIST</h1>
        <div className="head_controls">
          <InputSearch
            className={"head_input"}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleFilter={handleFilter}
          />
          <Selector
            selector={selector}
            setSelector={setSelector}
            className="head__selector"
          />
          <button
            className="head_button"
            onClick={() => setDarkMode(!darkMode)}
          >
            <img
              src={darkMode ? light : dark}
              alt={darkMode ? "Dark Mode" : "Light Mode"}
            ></img>
          </button>
        </div>
      </div>
      <div className="main">
        <div className="main_list">
          <UlistContent
            toDoList={toDoList}
            selector={selector}
            searchValue={searchValue}
            setToDoList={setToDoList}
          />
        </div>
        <div className="main_div_button">
          <button className="main_div_add_button" onClick={openModal}>
            <img src={plusIcon} alt="Add Note" />
          </button>
        </div>
      </div>
      <section className="modal">
        <ReactModal
          isOpen={modalIsOpen}
          onCloseModal={closeModal}
          contentLabel="Example Modal"
          style={{
            content: {
              top: "40%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: "var(--modal-bg-color)",
              padding: "20px",
              width: "500px", // Adjust the width as needed
              height: "250px", // Adjust the height as needed
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Form
            inputValue={inputValue}
            setInputValue={setInputValue}
            setToDoList={setToDoList}
            toDoList={toDoList}
            closeModal={closeModal}
            handleSubmit={(event) =>
              handleSubmit(event, inputValue, setInputValue, setToDoList)
            }
            handleCancel={handleCancel}
            className="modal_form"
          />
        </ReactModal>
      </section>
    </div>
  );
}
