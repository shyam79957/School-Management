import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/api-client';
import { useEffect, useState } from 'react';
import './ClassStudents.css';
import AddStudentForm from '../components/StudentForm'; // Import the form component

const ClassStudents = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false); // toggle for form modal
  const [editingStudent, setEditingStudent] = useState(null); // store student being edited

  const fetchStudents = async () => {
    try {
      const res = await apiClient.get(`/students/class/${classId}`);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await apiClient.delete(`/students/${id}`);
        setStudents(students.filter((s) => s._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // Add new or update existing student
  const handleSaveStudent = async (studentData) => {
    try {
      if (editingStudent) {
        // Update existing student
        await apiClient.put(`/students/${editingStudent._id}`, studentData);
      } else {
        // Add new student, include classId
        await apiClient.post('/students', { ...studentData, class: classId });
      }
      setShowForm(false);
      setEditingStudent(null);
      fetchStudents(); // Refresh list after saving
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  // Open form with selected student data for editing
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Close form and clear editing state
  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="container">
      <h1>Students in Class {classId}</h1>

      <div className="top-bar" style={{ justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin/students/class')} className="add-btn">
          ⬅ Back to Class List
        </button>
        <button onClick={() => setShowForm(true)} className="add-btn">
          ➕ Add Student
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.gender}</td>
                <td>{s.class}</td>
                <td>{s.address}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleEditClick(s)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(s._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No students found in class {classId}.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddStudentForm
              classValue={classId}
              initialData={editingStudent} // Pass data for editing
              onSave={handleSaveStudent}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassStudents;
