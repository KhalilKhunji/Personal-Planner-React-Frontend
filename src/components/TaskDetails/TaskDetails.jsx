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
            {task.notes.map((note) => (
                note.title
            ))} 
        </>
    )
};

export default TaskDetails;