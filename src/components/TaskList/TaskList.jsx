import {Link} from 'react-router-dom';

const TaskList = ({tasks, user}) => {
    return (
        <>
        <section>
        <ul className='task-lists'>
            {tasks.map((task)=> (
                <Link key={task._id} to={`/tasks/${task._id}`}>
                    <li>Task: {task.name}</li>
                </Link>
            ))}
        </ul>
        </section>
        <div className="buttonContainer"><button><Link to={`/tasks/new`}>Add Task!</Link></button></div>
        </>
    );
};

export default TaskList;



