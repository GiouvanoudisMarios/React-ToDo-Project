// basic fetch of the whole db
export const fetchResponse = async () => {
  try {
    const response = await fetch("http://localhost:8000/toDos");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch error: ${error}`);
  }
};
// onSubmit to add a new object
export const addTask = async (inputValue, setInputValue, setToDoList) => {
  let newId = new Date();

  const response = await fetch("http://localhost:8000/toDos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: newId,
      description: inputValue,
      completed: false,
    }),
  });

  setInputValue("");
  const updatedList = await fetchResponse();
  setToDoList(updatedList);
};

// onClick to delete

export const deleteToDo = async (id, toDoList, setToDoList) => {
  try {
    const response = await fetch(`http://localhost:8000/toDos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const remainingToDos = toDoList.filter((toDo) => toDo.id !== id);
    setToDoList(remainingToDos);
  } catch (error) {
    console.error("Failed to delete the task:", error);
  }
};

// PUT  updateTask will use the corresponding function on updateProperties , 1 function will update description, 1 completed

export const updateTask = async (id, updateProperties, setToDoList) => {
  try {
    const response = await fetch(`http://localhost:8000/toDos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProperties),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const updatedList = await fetchResponse();
    setToDoList(updatedList);
  } catch (error) {
    throw new Error(`Failed to update ${error}`);
  }
};

// this will be used in PUT updateTask to update completed
export const updateTaskCompleted = async (id, completed, setToDoList) => {
  try {
    // I have to fetch the whole object based on ID so that it won't ruin my other properties when I change completed
    const response = await fetch(`http://localhost:8000/toDos/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    const objectWithNewCompleted = {
      ...data,
      completed: completed,
    };
    await updateTask(id, objectWithNewCompleted, setToDoList);
  } catch (error) {
    throw new Error(`Error at updateTaskCompleted ${error}`);
  }
};
