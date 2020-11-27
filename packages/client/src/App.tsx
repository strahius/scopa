import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.data));
  }, []);

  const renderUsers = () => {
    return (
      <div>
        <p>Users:</p>
        {users.map((user) => (
          <p key={user}>{user}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {renderUsers()}
    </div>
  );
}

export default App;
