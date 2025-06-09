import React, { useState } from 'react';
import './StudentForm.css'; // your existing styles
import apiClient from '../api/api-client';

const classOptions = ['1A', '1B', '2A', '2B', '3A', '3B']; // frontend enum

const StudentForm = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    class: '',
    dob: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // your existing post logic
      await apiClient.post('/students', form);
      alert('Student added successfully!');
      setForm({
        name: '',
        gender: '',
        class: '',
        dob: '',
        address: ''
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {/* Cancel button on top right */}
      <button
        type="button"
        className="cancel-btn"
        onClick={onCancel}
        aria-label="Cancel adding student"
      >
        ✖
      </button>

      <h2>Add Student</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="class">Class</label>
      <select
        id="class"
        name="class"
        value={form.class}
        onChange={handleChange}
        required
      >
        <option value="">Select class</option>
        {classOptions.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      <label htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
      />

      <label htmlFor="address">Address</label>
      <textarea
        id="address"
        name="address"
        value={form.address}
        onChange={handleChange}
      />

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
