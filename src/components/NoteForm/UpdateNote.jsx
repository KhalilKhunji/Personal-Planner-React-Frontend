import React, { useState } from "react";

const UpdateForm = ({ note, handleUpdateNote, setSelectedNote }) => {
  const [UpdateForm, setUpdateForm] = useState({
    title : note.title ,
    content: note.content
  });

  const handleChange = (event) => {
    setUpdateForm({ ...UpdateForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateNote(note._id, UpdateForm);
    setSelectedNote(null);
  };

  return (
    <>
   <form onSubmit={handleSubmit}>
  <label htmlFor="title">Note Title:</label>
  <input
    type="text"
    name="title"
    id="title"
    value={UpdateForm.title}
    required
    onChange={handleChange}
  />
  <br />
  <label htmlFor="content">Note Content:</label>
  <br />
  <textarea
    name="content"
    id="content"
    value={UpdateForm.content}
    required
    onChange={handleChange}
  />
  <br />
  <button type="submit">update </button>
</form>
</>
)
};

export default UpdateForm;
