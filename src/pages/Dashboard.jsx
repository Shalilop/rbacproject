import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import backgroundImage from "../assets/background.jpg"; 
import './Dashboard.css'; 

const Dashboard = () => {
  const { users, roles } = useContext(AppContext);

  const dashboardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '80vh', 
  };

  return (
    <div className="dashboard-container" style={dashboardStyle}>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="grid">
       
        <div className="card card-user">
          <h2 className="card-title">Users</h2>
          <p className="card-text">{users.length} total users</p>
          <div className="card-status">Active</div>
        </div>

        {/* Roles Card */}
        <div className="card card-role">
          <h2 className="card-title">Roles</h2>
          <p className="card-text">{roles.length} total roles</p>
          <div className="card-status">Active</div>
        </div>

        {/* Placeholder for Additional Cards */}
        
      </div>
    </div>
  );
};

export default Dashboard;

