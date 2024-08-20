import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      { user ? (
        <nav>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/tasks">Tasks List</Link></p>
            <p><Link to="" onClick={handleSignout}>Sign Out</Link></p>
        </nav>
      ) : (
        <nav>
            <p><Link to="/signin">Sign In</Link></p>
            <p><Link to="/signup">Sign Up</Link></p>
        </nav>
      )}
    </>
  )
}

export default NavBar;