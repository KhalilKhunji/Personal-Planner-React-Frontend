const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`;

const index = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  };
};

const show = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}` , {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    })
    return res.json()
  } catch(error) {
    console.error("Error:", error )
  }
}


export { index , show };