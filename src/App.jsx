import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Collection from './components/Collection/Collection';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';

//
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import TaskForm from './components/TaskForm/TaskForm';





const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
          <>
          <Route path="/" element={<Collection user={user} />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/tasks/new" element={<TaskForm />} />
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