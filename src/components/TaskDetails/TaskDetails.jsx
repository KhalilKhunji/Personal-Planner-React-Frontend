import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as taskService from "../../services/taskService";
import ItemForm from "../ItemForm/ItemForm";
import * as itemService from "../../services/itemService";

const TaskDetails = ({ user }) => {
  const [task, setTask] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const { taskId } = useParams();

  useEffect(() => {
    const getTask = async () => {
      const priorities = ["Low", "Medium", "High"];

            const taskData = await taskService.show(taskId);
            setTask(taskData);

            // SORT TASKS BY PRIORITY
            console.log(taskData)
            const sortedData = taskData.items.sort((a, b) => priorities.indexOf(b.priority) - priorities.indexOf(a.priority))
            
        };
        getTask();
    }, [taskId]);

  const handleAddItem = async (todolist) => {
    const newItem = await itemService.create(taskId, todolist);
    const copyItem = { ...task };
    copyItem.items.push(newItem);

    setTask(copyItem);
  };

  if (!task) return <main>Loading Task...</main>;

  return (
    <>
      <h1>{task.name}</h1>
      <h2>{user.username} TodoLists: </h2>
      {task.items.map((item) => (
        <div key={item._id}>
          <input type="checkbox" name="list-items" />
          <label htmlFor="list-items">{item.text}</label>
        </div>
      ))}
      <br />
      {showForm ? (
        <ItemForm handleAddItem={handleAddItem} />
      ) : (
        <button onClick={() => setShowForm(true)}>Add Item</button>
      )}
      <h2>{user.username} Notes: </h2>
      {task.notes.map((note) => (
        <div key={note._id}>
          <h3>Title: {note.title}</h3>
          <p>Content: {note.content}</p>
        </div>
      ))}
    </>
  );
};

export default TaskDetails;
