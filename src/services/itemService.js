const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks/`;

const getItems = async (taskId,todolist) => {
  try {
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todolist),
    };
    const res = await fetch(`${BASE_URL}/${taskId}/items/`, option);
    return res.json();
  } catch (error) {
    console.error("Something went Wrong!");
  }
};

const updateItem = async (taskId, itemId, todolist) => {
  try {
    const option = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todolist),
    };
    const res = await fetch(`${BASE_URL}/${taskId}/items/${itemId}`, option);
    return res.json();
  }
  catch (error) {
    console.error("Something went Wrong!");
  }
}

const deleteItem = async (taskId, itemId) => {
  try {
    const option = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await fetch(`${BASE_URL}/${taskId}/items/${itemId}`, option);
    return res.json();
  } catch (error) {
    console.error("Something went Wrong!");
  }
}

export { getItems, updateItem , deleteItem };
