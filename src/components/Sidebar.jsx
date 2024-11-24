import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white flex flex-col h-screen">
    <div className="p-4 text-2xl font-bold">RBAC Admin</div>
    <nav className="flex flex-col gap-2 p-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 p-2 rounded"
            : "p-2 hover:bg-gray-700 rounded"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 p-2 rounded"
            : "p-2 hover:bg-gray-700 rounded"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/roles"
        className={({ isActive }) =>
          isActive
            ? "bg-gray-700 p-2 rounded"
            : "p-2 hover:bg-gray-700 rounded"
        }
      >
        Roles
      </NavLink>
    </nav>
  </div>
);

export default Sidebar;
