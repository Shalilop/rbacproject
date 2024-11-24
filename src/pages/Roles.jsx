import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import RoleTable from "../components/RoleTable"; 
import AddRoleForm from "../components/AddRoleForm"; 
import './Roles.css'; 

const Roles = () => {
  const { roles, addRole, editRole, deleteRole } = useContext(AppContext);
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); 

 
  const toggleAddRoleForm = () => setShowAddRoleForm(!showAddRoleForm);

  
  const handleClose = () => {
    setShowAddRoleForm(false);
    setSelectedRole(null);
  };
  const handleEditRole = (role) => {
    setSelectedRole(role); 
    setShowAddRoleForm(true);
  };

  return (
    <div className="roles-container">
      <h2>Manage Roles</h2>

     
      <button className="button-toggle" onClick={toggleAddRoleForm}>
        {showAddRoleForm ? "Cancel" : "Add New Role"}
      </button>

      
      {showAddRoleForm && (
        <AddRoleForm
          addRole={addRole}
          editRole={editRole}
          selectedRole={selectedRole}
          onClose={handleClose}
        />
      )}

     
      <RoleTable
        roles={roles}
        deleteRole={deleteRole}
        editRole={handleEditRole} 
      />
    </div>
  );
};

export default Roles;
