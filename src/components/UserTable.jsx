import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Modal from "../components/Modal";
import './UserTable.css'; 

const Users = () => {
  const { users, roles, addUser, editUser, deleteUser } = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null); 

  const handleAddUser = () => {
    addUser(newUser);
    setModalOpen(false);
    setNewUser({ name: "", email: "", role: "", status: "Active" }); 
  };

  const handleEditUser = (user) => {
    setNewUser({ ...user }); 
    setModalOpen(true); 
  };    setEditingUser(user); 

  const handleSaveEdit = () => {
    editUser(editingUser.id, newUser); 
    setModalOpen(false);
    setEditingUser(null); 
  };

  return (
    <div className="users-container">
      <h1 className="heading">Users</h1>
      <button className="add-button" onClick={() => setModalOpen(true)}>Add User</button>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="edit-button">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="modal-title">{editingUser ? "Edit User" : "Add User"}</h2>
        <input 
          className="input-field" 
          placeholder="Name" 
          value={newUser.name} 
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required
        />
        <input 
          className="input-field" 
          placeholder="Email" 
          value={newUser.email} 
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select 
          className="input-field" 
          value={newUser.role} 
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}required
        >
          <option value="">Select Role</option>
          {roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option>)}
        </select>
        <select 
          className="input-field" 
          value={newUser.status} 
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="modal-actions">
          <button 
            className="save-button" 
            onClick={editingUser ? handleSaveEdit : handleAddUser}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </button>
          <button 
            className="cancel-button" 
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
