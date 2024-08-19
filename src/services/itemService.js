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
    console.error("Error", error);
  }
};

export { getItems};
