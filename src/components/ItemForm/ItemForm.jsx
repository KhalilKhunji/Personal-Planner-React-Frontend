import React, { useState } from 'react';


const ItemForm = ({handleAddItem}) => {

    const [todolist, setTodolist] = useState({
        text: '',
        isComplete: false,
        dueDate: '',
        priority: 'default'
    });

    const handleChange = (event) => {
        setTodolist({...todolist, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddItem(todolist);
    }

    return(
    <>
        <form onSubmit={handleSubmit}>

            <label htmlFor="text">Item Text:</label>
            <input type="text" name="text" id="text" value={todolist.text} required onChange={handleChange} />
            <br />
            <label htmlFor="isComplete">Is Complete:</label>
            <input type="checkbox" name="isComplete" id="isComplete" value={todolist.isComplete}  onChange={handleChange}/>
            <br />
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" name="dueDate" id="dueDate" min={new Date().toISOString().split('T')[0]} value={todolist.dueDate} onChange={handleChange}/>
            <br />
            <label htmlFor="priority">Priority:</label>
            <select name="priority" id="priority" value={todolist.priority} onChange={handleChange}>
                <option value="default" disabled>Select a Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <br />
            <button type="submit">Add Item!</button>
        </form>
    </>
    )
};

export default ItemForm;