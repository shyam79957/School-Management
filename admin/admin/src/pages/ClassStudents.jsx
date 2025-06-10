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
  const [studentToDelete, setStudentToDelete] = useState(null);


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



const handleDelete = (id) => {
  const student = students.find((s) => s._id === id);
  setStudentToDelete(student);
};

const confirmDelete = async () => {
  try {
    await apiClient.delete(`/students/${studentToDelete._id}`);
    setStudents(students.filter((s) => s._id !== studentToDelete._id));
  } catch (error) {
    console.error('Delete failed:', error);
  } finally {
    setStudentToDelete(null);
  }
};

const cancelDelete = () => {
  setStudentToDelete(null);
};


const handleSaveStudent = async (studentData) => {
  try {
    if (editingStudent) {
      // Update
      await apiClient.put(`/students/${editingStudent._id}`, {
        ...studentData,
        class: classId,
      });
    } else {
      // Add new
      await apiClient.post('/students', {
        ...studentData,
        class: classId,
      });
    }
    setShowForm(false);
    setEditingStudent(null);
    fetchStudents();
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
        <button onClick={() => navigate('/admin/students')} className="add-btn">
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
              initialData={editingStudent}
              onSave={handleSaveStudent}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}


        {studentToDelete && (
          <div className="modal-overlay">
            <div className="modal-content confirm-modal">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete <strong>{studentToDelete.name}</strong>?</p>
              <div className="confirm-actions">
                <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                <button className="delete-btn" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ClassStudents;
