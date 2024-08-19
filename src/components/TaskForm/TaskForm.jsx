import { useState } from "react";

const TaskForm = ({ handleAddTask }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTask(formData);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Task Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <button type="submit">Create Task!</button>
      </form>
    </>
  );
};

export default TaskForm;
