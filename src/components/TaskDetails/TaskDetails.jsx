import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService';

const TaskDetails = ({ user }) => {
    const [task, setTask] = useState(null);
    // create state for high priority list items
    const [item, setItem] = useState(null);

    const { taskId } = useParams();

    useEffect(() => {
        const getTask = async () => {
            const priorities = ['Low', 'Medium', 'High']

            const taskData = await taskService.show(taskId);
            setTask(taskData);
            //SORT ITEMS BY DATE 
            const sortedByDate = taskData.items.sort((a, b) => new Date(...a.dueDate.split('/').reverse()) - new Date(...b.dueDate.split('/').reverse()));
            
            // SORT ITEMS BY PRIORITY
            console.log(taskData)
            const sortedData = taskData.items.sort((a, b) => priorities.indexOf(b.priority) - priorities.indexOf(a.priority))
            console.log(taskData)
        };
        getTask();
    }, [taskId]);

    if (!task) return <main>Loading Task...</main>

    return(
        <>
            <h1>{task.name}</h1>
            <h2>{user.username} TodoLists: </h2>
            {task.items.map((item) => (
                <div key={item._id}>
                    <input type="checkbox" name="list-items"/>
                    <label htmlFor="list-items">{item.text}</label>
                </div>
            ))}
            <h2>{user.username} Notes: </h2>
            {task.notes.map((note) => (
                <div key={note._id}>
                    <h3>Title: {note.title}</h3>
                    <p>Content: {note.content}</p>
                </div>
            ))} 
        </>
    )
};

export default TaskDetails;