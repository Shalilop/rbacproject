import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import './AddRoleForm.css';

const AddRoleForm = ({ selectedRole, addRole, editRole, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

 
  useEffect(() => {
    if (selectedRole) {
      setRoleName(selectedRole.name);
      setPermissions(selectedRole.permissions);
    }
  }, [selectedRole]);

  const handleAddRole = () => {
    if (roleName && permissions.length > 0) {
      const newRole = { name: roleName, permissions };
      addRole(newRole); 
      onClose(); 
    }
  };

  const handleEditRole = () => {
    if (roleName && permissions.length > 0) {
      const updatedRole = { ...selectedRole, name: roleName, permissions };
      editRole(selectedRole.id, updatedRole); 
      onClose(); 
    }
  };

  const handlePermissionChange = (e) => {
    const permission = e.target.value;
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedRole ? "Edit Role" : "Add New Role"}</h2>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Role Name"
          className="input-field"
        />
        <div className="permissions">
          <label>
            <input
              type="checkbox"
              value="read"
              checked={permissions.includes("read")}
              onChange={handlePermissionChange}
            />
            Read
          </label>
          <label>
            <input
              type="checkbox"
              value="write"
              checked={permissions.includes("write")}
              onChange={handlePermissionChange}
            />
            Write
          </label>
          <label>
            <input
              type="checkbox"
              value="delete"
              checked={permissions.includes("delete")}
              onChange={handlePermissionChange}
            />
            Delete
          </label>
        </div>
        <div className="form-actions">
          <button
            onClick={selectedRole ? handleEditRole : handleAddRole}
            className="btn-save"
          >
            {selectedRole ? "Save Changes" : "Add Role"}
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoleForm;
