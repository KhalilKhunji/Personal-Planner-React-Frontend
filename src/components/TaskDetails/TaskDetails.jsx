import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as taskService from "../../services/taskService";
import ItemForm from "../ItemForm/ItemForm";
import * as itemService from "../../services/itemService";
import NoteForm from "../NoteForm/NoteForm";
import * as noteService from "../../services/noteService";
// import "../../stylingCss/taskDetailsStyle.css";

const TaskDetails = ({ user }) => {
  const [task, setTask] = useState(null);

  const [showItemForm, setShowItemForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const { taskId } = useParams();

  useEffect(() => {
    const getTask = async () => {
      const priorities = ["Low", "Medium", "High"];
      const taskData = await taskService.show(taskId);
      setTask(taskData);
      const sortedData = taskData.items.sort(
        (a, b) =>
          priorities.indexOf(b.priority) - priorities.indexOf(a.priority)
      );
    };
    getTask();
  }, [taskId]);

  const handleAddItem = async (todolist) => {
    const newItem = await itemService.getItems(taskId, todolist);
    const copyItem = { ...task };
    copyItem.items.push(newItem);
    setTask(copyItem);
    setshowItemForm(false);
  };

  const handleAddNote = async (note) => {
    const newNote = await noteService.getNotes(taskId, note);
    const copyNote = { ...task };
    copyNote.notes.push(newNote);
    setTask(copyNote);
    setShowNoteForm(false);
  };

  if (!task) return <main>Loading Task...</main>;

  return (
    <>
      <h1>{task.name}</h1>
      <section className="Item-list">
      <h2>{user.username} TodoLists: </h2>
      {showItemForm ? (
        <>
          <ItemForm handleAddItem={handleAddItem} />
          <button onClick={() => setShowItemForm(false)}>Cancel Item</button>
        </>
      ) : (
        <button onClick={() => setShowItemForm(true)}>Add Item</button>
      )}
      {task.items.map((item) => (
        <div key={item._id}>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li>
              <strong>Name:</strong> {item.text}
            </li>
            <li>
              <strong>Is Complete:</strong> {item.isComplete ? "Yes" : "No"}
            </li>
            <li>
              <strong>Due Date:</strong>{" "}
              {new Date(item.dueDate).toLocaleDateString()}
            </li>
            <li>
              <strong>Priority:</strong> {item.priority}
            </li>
          </ul>
        </div>
      ))}
      </section>
      <br />
      <section className="Note-list">
      <h2>{user.username} Notes:</h2>
      {showNoteForm ? (
        <>
          <NoteForm handleAddNote={handleAddNote} />
          <button onClick={() => setShowNoteForm(false)}>Cancel Note</button>
        </>
      ) : (
        <button onClick={() => setShowNoteForm(true)}>Add Note</button>
      )}
      {task.notes.map((note) => (
        <dl key={note._id} style={{ marginBottom: "1em" }}>
          <dt style={{ fontWeight: "bold" }}>Title:</dt>
          <dd>{note.title}</dd>
          <dt style={{ fontWeight: "bold" }}>Content:</dt>
          <dd>{note.content}</dd>
        </dl>
      ))}
      </section>
    </>
  );
};

export default TaskDetails;
