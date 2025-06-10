const Grade = require('../Models/Grade');
const Student = require('../Models/Student');
const Teacher = require('../Models/Teacher');

// Create grade
// exports.createGrade = async (req, res) => {
//   try {
//     const grade = new Grade(req.body);
//     await grade.save();
//     res.status(201).json(grade);
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating grade', error: err.message });
//   }
// };

exports.createGrade = async (req, res) => {
  try {
    const teacherId = req.user._id;  // logged in teacher ID

    // Find teacher assigned classes
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(403).json({ message: 'Teacher not found' });

    // Find student and check class
    const student = await Student.findById(req.body.student);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Check if student.classSection is in teacher.assignedClass
    if (!teacher.assignedClass.includes(student.classSection)) {
      return res.status(403).json({ message: 'You are not authorized to grade this student' });
    }

    // Proceed to create grade
    const grade = new Grade({
      ...req.body,
      teacher: teacherId  // ensure teacher is logged-in teacher
    });

    await grade.save();
    res.status(201).json(grade);
  } catch (err) {
    res.status(400).json({ message: 'Error creating grade', error: err.message });
  }
};

// Explanation
// You get the logged-in teacher from req.user (make sure your auth middleware sets that).

// Fetch the teacher's assigned classes.

// Fetch the student by ID from the grade creation request.

// Check if the student’s class is among the teacher’s assigned classes.


// Update grade — only assigned teacher or admin can update
exports.updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    // Check authorization
    // req.user.role and req.user._id comes from auth middleware
    if (
      req.user.role !== 'admin' && 
      grade.teacher.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Access denied: You can update only your assigned grades' });
    }

    // Update with request body
    Object.assign(grade, req.body);
    await grade.save();

    res.json(grade);
  } catch (err) {
    res.status(400).json({ message: 'Error updating grade', error: err.message });
  }
};

// Delete grade — only assigned teacher or admin can delete
exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    if (
      req.user.role !== 'admin' && 
      grade.teacher.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Access denied: You can delete only your assigned grades' });
    }

    await grade.remove();
    res.json({ message: 'Grade deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting grade' });
  }
};

// Explanation
// First, fetch the grade by ID.

// Check if the logged-in user (req.user) is an admin or the teacher who owns this grade.

// If not authorized, return 403 Forbidden.

// Otherwise, proceed with update or delete.

// Would you like me to help you update the routes or middleware accordingly?


// Get all grades
exports.getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('student', 'name rollNumber class')
      .populate('teacher', 'name');
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grades' });
  }
};

// Get grade by ID
exports.getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('student', 'name rollNumber class')
      .populate('teacher', 'name');
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grade' });
  }
};


// // Update grade
// exports.updateGrade = async (req, res) => {
//   try {
//     const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!grade) return res.status(404).json({ message: 'Grade not found' });
//     res.json(grade);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating grade', error: err.message });
//   }
// };

// // Delete grade
// exports.deleteGrade = async (req, res) => {
//   try {
//     const grade = await Grade.findByIdAndDelete(req.params.id);
//     if (!grade) return res.status(404).json({ message: 'Grade not found' });
//     res.json({ message: 'Grade deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting grade' });
//   }
// };
