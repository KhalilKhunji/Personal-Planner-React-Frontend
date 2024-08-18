import TaskList from '../TaskList/TaskList';
import TaskDetails from '../TaskDetails/TaskDetails';
import TaskForm from '../TaskForm/TaskForm';


const Collection = ({ user }) => {
    return (
      <main>
        <h1>Welcome, {user.username}</h1>
        <p>
          This is the collection page where you, and only you, can see a collection
          of your tasks.
        </p>
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:taskId/edit" element={<TaskForm />} />
        </Routes>
      </main>
    );
};
    
export default Collection;