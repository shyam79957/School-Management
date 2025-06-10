import React, { useEffect, useState } from 'react';
import './StudentForm.css';
import apiClient from '../api/api-client';

const StudentForm = ({ onSave, onCancel, initialData = null, classValue }) => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    dob: '',
    address: ''
  });

  // Prefill form on edit
  useEffect(() => {
    if (initialData) {
      const { name, gender, dob, address } = initialData;
      setForm({ name, gender, dob: dob?.slice(0, 10), address });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({ ...form }); // class is passed by parent
      setForm({ name: '', gender: '', dob: '', address: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to save student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="top-bar">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          ✖
        </button>
      </div>

      <h2>{initialData ? 'Edit Student' : 'Add Student'}</h2>

      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="dob">Date of Birth</label>
      <input id="dob" type="date" name="dob" value={form.dob} onChange={handleChange} />

      <label htmlFor="address">Address</label>
      <textarea id="address" name="address" value={form.address} onChange={handleChange} />

      <button type="submit">{initialData ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
