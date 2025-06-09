import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name || user?.email || 'User'}!</h1>
      <h1>This is your Admin Dashboard</h1>


    </div>
  );
};

export default Dashboard;
