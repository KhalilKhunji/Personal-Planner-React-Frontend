import {Link} from 'react-router-dom';

const Collection = ({ user }) => {
    return (
      <main>
        <h1>Welcome, {user.username}</h1>
        <p>
          You are now logged in! View your <Link to="/tasks">tasks!</Link>
        </p>
      </main>
    );
};
    
export default Collection;