import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as taskService from '../../services/taskService';

const TaskDetails = ({ user }) => {
    const [task, setTask] = useState(null);
    const { taskId } = useParams();

    useEffect(() => {
        const getTask = async () => {
            const taskData = await taskService.show(taskId);
            setTask(taskData);
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