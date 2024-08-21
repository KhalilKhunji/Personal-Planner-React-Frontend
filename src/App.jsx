import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Collection from './components/Collection/Collection';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';
import * as taskService from '../src/services/taskService';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskForm from './components/TaskForm/TaskForm';





const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddTask = async (formData) => {
    const newTask = await taskService.create(formData);
    setTasks([...tasks, newTask]);
    navigate('/tasks');
  };

  useEffect(() => {
    const getTasks = async () => {
      const taskData = await taskService.index();
      setTasks(taskData);
    };
    if (user) {
      getTasks();
    };
  },[user]);

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
          <>
          <Route path="/" element={<Collection user={user} />} />
          <Route path="/tasks" element={<TaskList user={user} tasks={tasks} />} />
          <Route path="/tasks/:taskId" element={<TaskDetails user={user} tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks/new" element={<TaskForm handleAddTask={handleAddTask} />} />
          <Route path="/tasks/:taskId/edit" element={<TaskForm />} />
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;