const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./Routes/authRoutes');
const studentRoutes = require('./Routes/studentRoutes');
const teacherRoutes = require('./Routes/teacherRoutes');
const parentRoutes = require('./Routes/parentRoutes');
const gradeRoutes = require('./Routes/gradeRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/grades', gradeRoutes);

// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
