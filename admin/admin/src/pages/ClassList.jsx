// src/pages/admin/ClassList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClassList.css';

const classes = [
  { id: '1A', name: '1A' },
  { id: '1B', name: '1B' },
  { id: '2A', name: '2A' },
  { id: '2B', name: '2B' },
  { id: '3A', name: '3A' },
  { id: '3B', name: '3B' },
];

const ClassList = () => {
  const navigate = useNavigate();

  const handleClassClick = (classId) => {
    navigate(`/admin/students/class/${classId}`);
  };

  return (
    <div className="class-list">
      <h2>Select a Class</h2>
      <div className="class-cards">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card" onClick={() => handleClassClick(cls.id)}>
            {cls.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
