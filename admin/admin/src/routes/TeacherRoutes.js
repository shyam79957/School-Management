// src/routes/TeacherRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/teacher/Dashboard';
import Students from '../pages/teacher/StudentList';
import Grades from '../pages/teacher/GradeEntry';
import PrivateRoute from './PrivateRoute';

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={['teacher']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/students"
        element={
          <PrivateRoute allowedRoles={['teacher']}>
            <Students />
          </PrivateRoute>
        }
      />
      <Route
        path="/grades"
        element={
          <PrivateRoute allowedRoles={['teacher']}>
            <Grades />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default TeacherRoutes;
