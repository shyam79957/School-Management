const express = require('express');
const {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} = require('../Controllers/teacherController');

const { authenticate, authorize } = require('../Middleware/auth');

const router = express.Router();

router.use(authenticate); // Require login for all routes

router.post('/', authorize('admin'), createTeacher);
router.get('/', authorize('admin', 'teacher'), getAllTeachers);
router.get('/:id', authorize('admin', 'teacher'), getTeacherById);
router.put('/:id', authorize('admin'), updateTeacher);
router.delete('/:id', authorize('admin'), deleteTeacher);

module.exports = router;
