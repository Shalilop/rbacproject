import React from "react";
import './RoleTable.css';

const RoleTable = ({ roles, deleteRole, editRole }) => {
  return (
    <div className="role-table-container">
      <table className="role-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => editRole(role)} 
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteRole(role.id)} 
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
