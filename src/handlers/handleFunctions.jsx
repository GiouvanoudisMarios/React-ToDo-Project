import {
  fetchResponse,
  addTask,
  deleteToDo,
  updateTaskCompleted,
} from "../API/fetchAPI";

// initialize toDoList based on db.json the first time it runs
export const fetchInitialData = async (setToDoList) => {
  try {
    const data = await fetchResponse();
    setToDoList(data);
    // setFilteredList(data)
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
  }
};

// handleSubmit to use addTask from fetchAPI to add a new task to db.json and update our toDoList state
export const handleSubmit = async (
  event,
  inputValue,
  setInputValue,
  setToDoList
) => {
  event.preventDefault();
  await addTask(inputValue, setInputValue, setToDoList);
};
// handleDelete button
export const handleDelete = async (id, setToDoList) => {
  try {
    const toDoList = await fetchResponse(); // Fetch the latest toDoList
    await deleteToDo(id, toDoList, setToDoList);
  } catch (error) {
    console.error("Failed to delete the task:", error);
  }
};

// handleCheck to change toDolist.completed === checkBox
export const handleCheck = (id, completed, setToDoList) => {
  updateTaskCompleted(id, !completed, setToDoList);
};

// handleFilter for Search input will need event.preventDefault()
export const handleFilter = (event, searchValue, setSearchValue) => {
  event.preventDefault();
  setSearchValue(searchValue);
};

// handleCancel to clear input and close modal
export const handleCancel = (setInputValue, closeModal) => {
  setInputValue("");
  closeModal();
};
