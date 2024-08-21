const DeleteTask = ({handleDeleteTask, taskId, showDelete, render}) => {
    return (
        <div className="Delete-Task">
          <p>Are you sure you want to delete?</p>
          <div className="DeleteTaskButton">
            <button className="delete" onClick={() => handleDeleteTask(taskId)}>Confirm Delete</button>
            <button type="button" onClick={() => render()}>Don't Delete!</button>
          </div>
        </div>
      );
      
};

export default DeleteTask;