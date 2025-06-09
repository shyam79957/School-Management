import React, { useState, useEffect } from 'react';
import apiClient from '../../api/api-client';

const GradeEntry = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await apiClient.get('/students/assigned');
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Grade Entry</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name} - Roll: {student.rollNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default GradeEntry;
