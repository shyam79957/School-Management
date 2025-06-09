// src/pages/admin/AdminHome.js
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminHome.css'; // For manual CSS

const AdminHome = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  return (
    <div className="admin-container">
      {/* Top Nav */}
      <header className="admin-header">
        <div className="school-name">GVMC High School</div>
        <div className="admin-header-right">
          <button className="register-button" onClick={handleRegister}>Register</button>
          <div className="profile-icon" onClick={handleProfileClick}>A</div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="admin-body">
        <nav className="admin-sidebar">
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/students">Students</Link></li>
            <li><Link to="/admin/teachers">Teachers</Link></li>
            <li><Link to="/admin/grades">Grades</Link></li>
          </ul>
        </nav>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
