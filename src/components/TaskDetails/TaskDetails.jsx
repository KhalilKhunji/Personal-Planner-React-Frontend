import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as taskService from "../../services/taskService";
import ItemForm from "../ItemForm/ItemForm";
import * as itemService from "../../services/itemService";
import NoteForm from "../NoteForm/NoteForm";
import * as noteService from "../../services/noteService";
import UpdateForm from "../ItemForm/UpdateForm";
import UpdateNote from "../NoteForm/UpdateNote";
import UpdateTask from "../TaskForm/UpdateTask";

const TaskDetails = ({ user }) => {
  const [task, setTask] = useState(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedNotes, setSelectedNote] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const { taskId } = useParams();

  useEffect(() => {
    const getTask = async () => {
      const priorities = ["Low", "Medium", "High"];
      const taskData = await taskService.show(taskId);
      taskData.items.sort(
        (a, b) =>
          priorities.indexOf(b.priority) - priorities.indexOf(a.priority)
      );
      setTask(taskData);
    };
    getTask();
  }, [trigger]);

  // handleAddItem, handleUpdateItem, handleDeleteItem

  const handleAddItem = async (todolist) => {
    const newItem = await itemService.getItems(taskId, todolist);
    const copyItem = { ...task };
    copyItem.items.push(newItem);
    setTask(copyItem);
    setShowItemForm(false);
    setTrigger(!trigger);
  };

  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const updatedItem = await itemService.updateItem(
        taskId,
        itemId,
        updatedData
      );
      const updatedItems = task.items.map((item) =>
        item._id === itemId ? updatedItem : item
      );
      setTask({ ...task, items: updatedItems });
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
    setTrigger(!trigger);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await itemService.deleteItem(taskId, itemId);
      const updatedItems = task.items.filter((item) => item._id !== itemId);
      setTask({ ...task, items: updatedItems });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // handleAddNote

  const handleAddNote = async (note) => {
    const newNote = await noteService.getNotes(taskId, note);
    const copyNote = { ...task };
    copyNote.notes.push(newNote);
    setTask(copyNote);
    setShowNoteForm(false);
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      const updatedNote = await noteService.updateNote(
        taskId,
        noteId,
        updatedData
      );
      const updatedNotes = task.notes.map((note) =>
        note._id === noteId ? updatedNote : note
      );
      setTask({ ...task, note: updatedNotes });
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
    setTrigger(!trigger);
  };


  
  const handleDeleteNote = async (noteId) => {
    try {
      const deletedd = await noteService.deleteNote(taskId, noteId);
      console.log(deletedd)
      const updatedNote = task.notes.filter((note) => note._id !== noteId);

      setTask({ ...task, notes: updatedNote });
    } catch (error) {
      console.error("Error deleting Note:", error);
    }
  };

  const handleUpdateTask = async (taskFormData, taskId) => {
    try {
      const updatedTask = await taskService.update(taskFormData, taskId);
      setTask(updatedTask);
      setShowTaskForm(false);
    } catch (error) {
      console.error("Error Updating Task Name:", error);
    };
  };

  if (!task) return <main>Loading Task...</main>;

  return (
    <>
      <h1>{task.name}</h1>
      {showTaskForm ?
        <>
        <UpdateTask task={task} taskId={taskId} handleUpdateTask={handleUpdateTask} />
        <button onClick={() => setShowTaskForm(false)}>Cancel</button>
        </>
        : 
        <></>
      }
      <button onClick={() => setShowTaskForm(true)}>Edit Task Name</button>
      <button className="delete" onClick={() => handleDeleteTask(taskId)}>Delete Task</button>
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
            <ul>
              <li>
                <strong>Name:</strong> {item.text}
              </li>
              <li>
                <strong>Is Complete:</strong> {item.isComplete ? "Yes" : "No"}
              </li>
              <li>
                <strong>Due Date:</strong>
                {new Date(item.dueDate).toLocaleDateString()}
              </li>
              <li>
                <strong>Priority:</strong> {item.priority}
              </li>
            </ul>

            {selectedItem === item._id ? (
              <UpdateForm
                item={item}
                handleUpdateItem={handleUpdateItem}
                setSelectedItem={setSelectedItem}
              />
            ) : (
              <button onClick={() => setSelectedItem(item._id)}>Update</button>
            )}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
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
          <div key={note._id}>
            <dl>
              <dt>Title:</dt>
              <dd>{note.title}</dd>
              <dt>Content:</dt>
              <dd>{note.content}</dd>
            </dl>
            {selectedNotes === note._id ? (
              <UpdateNote
                note={note}
                handleUpdateNote={handleUpdateNote}
                setSelectedNote={setSelectedNote}
              />
            ) : (
              <button onClick={() => setSelectedNote(note._id)}>Update</button>
            )}
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default TaskDetails;
