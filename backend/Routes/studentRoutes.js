const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass
} = require('../Controllers/studentController');


const { authenticate, authorize } = require('../Middleware/auth');

const router = express.Router();

router.use(authenticate); // All routes require login

router.post('/', authorize('admin'), createStudent);
router.get('/', authorize('admin', 'teacher'), getAllStudents);
router.get('/:id', authorize('admin', 'teacher'), getStudentById);
router.put('/:id', authorize('admin'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);
router.get('/class/:classId',authorize('admin', 'teacher'),getStudentsByClass);


module.exports = router;
