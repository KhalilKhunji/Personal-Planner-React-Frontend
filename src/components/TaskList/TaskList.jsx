import {Link} from 'react-router-dom';

const TaskList = ({tasks, user}) => {
    return (
        <>
        <ul>
            {tasks.map((task)=> (
                <Link key={task._id} to={`/tasks/${task._id}`}>
                    <li>Task: {task.name}</li>
                </Link>
            ))}
        </ul>
        <Link to={`/tasks/new`}><button>Add Task!</button></Link>
        </>
    );
};

export default TaskList;



