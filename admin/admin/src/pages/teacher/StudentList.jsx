import React, { useState, useEffect } from 'react';
import apiClient from '../../api/api-client';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    apiClient.get('/students/assigned').then((res) => setStudents(res.data));
  }, []);

  return (
    <div>
      <h2>My Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
