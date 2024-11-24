import React, { createContext, useState } from "react";


const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" ,status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor",status:"Inactive" },
]

const initialRoles = [
  { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
  { id: 2, name: "Editor", permissions: ["read", "write"] },
];


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);

 
  const mockApiCall = (action, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000); 
    });
  };

  const addUser = async (newUser) => {
    const updatedUser = await mockApiCall("add", newUser);
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...updatedUser, id: prevUsers.length + 1 },
    ]);
  };

  const editUser = async (updatedUser) => {
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);
    const updatedUsers = [...users];
    updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updatedUser };
    await mockApiCall("edit", updatedUsers[userIndex]);
    setUsers(updatedUsers);
  };

  const deleteUser = async (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    await mockApiCall("delete", id);
    setUsers(updatedUsers);
  };

  // Role management functions
  const addRole = async (newRole) => {
    const updatedRole = await mockApiCall("add", newRole);
    setRoles((prevRoles) => [
      ...prevRoles,
      { ...updatedRole, id: prevRoles.length + 1 },
    ]);
  };

  const editRole = async (id, updatedRole) => {
    console.log("Role ID to edit:", id);
    console.log("Available roles:", roles);  
  
    const roleIndex = roles.findIndex((role) => role.id === id);
    console.log("Role index:", roleIndex);  
  
    if (roleIndex === -1) {
      console.error("Role not found");
      return;
    }
  
    const updatedRoles = [...roles];
    updatedRoles[roleIndex] = { ...updatedRoles[roleIndex], ...updatedRole };
  
    try {
      await mockApiCall("edit", updatedRoles[roleIndex]);
      setRoles(updatedRoles);
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  
  const deleteRole = async (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    await mockApiCall("delete", id);
    setRoles(updatedRoles);
  };

  return (
    <AppContext.Provider
      value={{
        users,
        roles,
        addUser,
        editUser,
        deleteUser,
        addRole,
        editRole,
        deleteRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
