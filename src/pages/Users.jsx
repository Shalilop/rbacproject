import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import Modal from "../components/Modal";
import './Users.css'; 

const Users = () => {
  const { users, roles, addUser, editUser, deleteUser } = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null); 

  
  useEffect(() => {
    if (!isModalOpen) {
      setNewUser({ name: "", email: "", role: "", status: "Active" });
      setEditingUser(null);
    }
  }, [isModalOpen]);

  const handleAddUser = () => {
    addUser(newUser);
    setModalOpen(false);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user); 
    setNewUser({ ...user });
    setModalOpen(true); 
  };

  const handleSaveEdit = () => {
    
    const updatedUser = { ...editingUser, ...newUser };
    editUser(updatedUser);
    setModalOpen(false);
    setEditingUser(null); // Clear the editing state after saving
    setNewUser({ name: "", email: "", role: "", status: "Active" }); // Reset form after editing
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (editingUser) {
      handleSaveEdit();
    } else {
      handleAddUser();
    }
  };

  return (
    <div className="users-container">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <button className="button-add px-4 py-2 rounded mb-4" onClick={() => setModalOpen(true)}>
        Add User
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Role</th>
            <th className="table-cell">Status</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">{user.name}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{user.role}</td>
              <td className="table-cell">{user.status}</td>
              <td className="table-cell">
                <button onClick={() => handleEditUser(user)} className="button-edit">
                  Edit
                </button>
                <button onClick={() => deleteUser(user.id)} className="button-delete ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="modal-header mb-4">{editingUser ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            className="modal-input"
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <select
            className="modal-input"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            className="modal-input"
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-between">
            <button className="modal-button button-save" type="submit">
              {editingUser ? "Save Changes" : "Add User"}
            </button>
            <button
              className="modal-button button-cancel"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
