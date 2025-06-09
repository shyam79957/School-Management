const Student = require('../Models/Student');

// Create student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: 'Error creating student', error: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('grade parent');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// Get single student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('grade parent');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Error updating student' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};


// Get students by class (grade)
exports.getStudentsByClass = async (req, res) => {
  try {
    const classId = req.params.classId; // assuming route is /api/students/class/:classId
    const students = await Student.find({ class: classId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students for class', error: err.message });
  }
};

