import React, { useState } from 'react';

const NoteForm = (props) => {

    const NoteForm = ({handleAddNote}) => {

        const [todolist, setTodolist] = useState({
            text: ''
            
        });
    
        const handleChange = (event) => {
            setTodolist({...todolist, [event.target.name]: event.target.value})
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            handleAddNote(todolist);
        }
    
    
    return(<>
     <form onSubmit={handleSubmit}>

<label htmlFor="text">notes Text:</label>
<input type="text" name="text" id="text" value={Notes.text} required onChange={handleChange} />
<br />

<button type="submit">Add Note!</button>
</form></>)
};
}
export default NoteForm;