import React, { useState, useEffect } from "react";
import './UsersPage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (userName.trim()) {
      setUsers([...users, userName]);
      setUserName("");
    }
  };

  const editUser = (index) => {
    setIsEditing(true);
    setCurrentUserIndex(index);
    setUserName(users[index]);
  };

  const saveEditUser = () => {
    const updatedUsers = [...users];
    updatedUsers[currentUserIndex] = userName;
    setUsers(updatedUsers);
    setIsEditing(false);
    setUserName("");
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="users-container">
      <h2>Gestión de Usuarios</h2>
      <div className="users-form">
        <input
          type="text"
          className="input-field"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nombre de usuario"
        />
        {isEditing ? (
          <button className="save-button" onClick={saveEditUser}>
            Guardar
          </button>
        ) : (
          <button className="add-button" onClick={addUser}>
            Agregar Usuario
          </button>
        )}
      </div>
      <div className="users-list">
        {users.map((user, index) => (
          <div key={index} className="user-item">
            {user}
            <div className="actions">
              <button className="icon-button" onClick={() => editUser(index)}>
                <FaEdit />
              </button>
              <button className="icon-button" onClick={() => deleteUser(index)}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
