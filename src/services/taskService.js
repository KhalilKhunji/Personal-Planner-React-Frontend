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
    console.error("Something went Wrong!");
  };
};

const show = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}` , {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return res.json();
  } catch(error) {
    console.error("Something went Wrong!");
  };
};

const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return res.json();
  } catch (error) {
    console.error("Something went Wrong!");
  };
};

const update = async (formData, taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    return res.json();
  } catch (error) {
    console.error("Something went Wrong!");
  };
};

const remove = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return res.json();
  } catch (error) {
    console.error("Something went Wrong!");
  };
};

export { index, show, create, update, remove };