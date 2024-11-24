import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-header">
      <h1>Role-Based Access Control</h1>
    </div>
    <nav className="navbar-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Users
      </NavLink>
      <NavLink
        to="/roles"
        className={({ isActive }) =>
          isActive ? "navbar-link active" : "navbar-link"
        }
      >
        Roles
      </NavLink>
    </nav>
  </div>
);

export default Navbar;

