const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`;

const index = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};


export default { index };