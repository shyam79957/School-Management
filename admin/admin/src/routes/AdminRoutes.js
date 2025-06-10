// src/routes/AdminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import Teachers from '../pages/admin/Teacher';
import Grades from '../pages/admin/Grade';
import PrivateRoute from './PrivateRoute';
import AdminHome from '../pages/admin/AdminHome';
import ClassList from '../pages/ClassList';
import ClassStudents from '../pages/ClassStudents';
import Register from '../components/Register';
import Profile from '../components/Profile';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminHome />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<ClassList />} />
        <Route path="students/class/:classId" element={<ClassStudents />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="grades" element={<Grades />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
