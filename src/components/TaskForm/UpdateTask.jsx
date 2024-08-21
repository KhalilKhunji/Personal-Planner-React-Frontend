import { useState } from "react";

const UpdateTask = ({ task, taskId, handleUpdateTask, render }) => {
  const [formData, setFormData] = useState({
    name: task.name
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateTask(formData, taskId);
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
        <button type="submit">Update Task!</button>
        <button onClick={() => render()}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default UpdateTask;
