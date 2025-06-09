const express = require('express');
const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade
} = require('../Controllers/gradeController');

const { authenticate, authorize } = require('../Middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/', authorize('teacher', 'admin'), createGrade);
router.get('/', authorize('teacher', 'admin', 'parent'), getAllGrades);
router.get('/:id', authorize('teacher', 'admin', 'parent'), getGradeById);
router.put('/:id', authorize('teacher', 'admin'), updateGrade);
router.delete('/:id', authorize('admin', 'teacher'), deleteGrade);

module.exports = router;
