import React, { useState } from "react";

const UpdateForm = ({ note, handleUpdateItem, setSelectedItem }) => {
  const [UpdateForm, setUpdateForm] = useState({
    text: item.text,
    isComplete: item.isComplete,
    dueDate: item.dueDate
      ? new Date(item.dueDate).toISOString().split("T")[0]
      : "",
    priority: item.priority,
  });

  const handleChange = (event) => {
    setUpdateForm({ ...UpdateForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateItem(item._id, UpdateForm);
    setSelectedItem(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Item Text:</label>
      <input
        type="text"
        name="text"
        id="text"
        value={UpdateForm.text}
        required
        onChange={handleChange}
      />
      <br />
      <label htmlFor="isComplete">Is Complete:</label>
      <input
        type="checkbox"
        name="isComplete"
        id="isComplete"
        value={UpdateForm.isComplete}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        min={new Date().toISOString().split("T")[0]}
        value={UpdateForm.dueDate}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="priority">Priority:</label>
      <select
        name="priority"
        id="priority"
        value={UpdateForm.priority}
        onChange={handleChange}
      >
        <option value="default" disabled>
          Select a Priority
        </option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br />
      <button type="submit">Update Item!</button>
    </form>
  );
};

export default UpdateForm;
