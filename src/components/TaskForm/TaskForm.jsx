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
    <main>
      <form onSubmit={handleSubmit}>
        <div className="taskname">
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
        </div>
      </form>
    </main>
  );
};

export default TaskForm;
