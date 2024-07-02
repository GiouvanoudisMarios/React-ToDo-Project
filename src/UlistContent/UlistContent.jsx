import { handleCheck, handleDelete } from "../handlers/handleFunctions";
import empty from "../../assets/Detective-check-footprint.png";
import "./UlistContent.css";

export default function UlistContent({
  toDoList,
  selector,
  searchValue,
  setToDoList,
}) {
  const applyFilters = (toDoList, selector, searchValue) => {
    return toDoList
      .filter((toDo) => {
        if (selector === "Complete") {
          return toDo.completed;
        }
        if (selector === "Incomplete") {
          return !toDo.completed;
        }
        return true;
      })
      .filter((toDo) =>
        toDo.description.toLowerCase().includes(searchValue.toLowerCase())
      );
  };

  const filteredList = applyFilters(toDoList, selector, searchValue);

  if (filteredList.length > 0) {
    return (
      <ul>
        {filteredList.map((toDo) => (
          <li key={toDo.id} className="main_item">
            <input
              className="main_checkbox"
              type="checkbox"
              checked={toDo.completed}
              onChange={() => {
                handleCheck(toDo.id, toDo.completed, setToDoList);
              }}
            />
            <span
              className={`main_description ${
                toDo.completed ? "completed" : ""
              }`}
            >
              {toDo.description}
            </span>
            <button
              className="main_delete-button"
              onClick={() => handleDelete(toDo.id, setToDoList)}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="empty-state">
      <img src={empty} alt="No items" />
      <p>Empty...</p>
    </div>
  );
}
