import React, { useState } from 'react';

const NoteForm = ({handleAddNote}) => {

    const [note, setNote] = useState({
        title: '',
        content: ''
    });

    const handleChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddNote(note);
    }

    return(
    <>
        <form onSubmit={handleSubmit}>

            <label htmlFor="title">Note Title:</label>
            <input type="text" name="title" id="title" value={note.title} required onChange={handleChange} />
            <br />
            <label htmlFor="content">Note Content:</label>
            <br />
            <textarea type="text" name="content" id="content" value={note.content} required onChange={handleChange} />
            <br />
            <button type="submit">Add Note!</button>
        </form>
    </>
    )
};

export default NoteForm;