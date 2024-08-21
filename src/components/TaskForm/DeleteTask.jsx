const DeleteTask = ({handleDeleteTask, taskId, showDelete, render}) => {
    return(
        <div>
            <p>Are you sure you want to delete?</p>
            <button className="delete" onClick={() => handleDeleteTask(taskId)}>Confirm Delete</button>
            <button onClick={() => {render()}}>Don't Delete!</button>
        </div>
    );
};

export default DeleteTask;