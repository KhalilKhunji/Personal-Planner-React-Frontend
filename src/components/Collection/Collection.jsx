

const Collection = ({ user }) => {
    return (
      <main>
        <h1>Welcome, {user.username}</h1>
        <p>
          This is the collection page where you, and only you, can see a collection
          of your tasks.
        </p>
      </main>
    );
};
    
export default Collection;