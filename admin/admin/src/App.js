// src/App.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminRoutes from './routes/AdminRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import { AuthContext } from './auth/AuthContext';


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      
      {user?.role === 'admin' && (
        <Route path="/admin/*" element={<AdminRoutes />} />
      )}
      
      {user?.role === 'teacher' && (
        <Route path="/teacher/*" element={<TeacherRoutes />} />
      )}
    </Routes>
  );
};

export default App;
