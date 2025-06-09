const express = require('express');
const {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent
} = require('../Controllers/parentController');

const { authenticate, authorize } = require('../Middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/', authorize('admin'), createParent);
router.get('/', authorize('admin'), getAllParents);
router.get('/:id', authorize('admin', 'parent'), getParentById);
router.put('/:id', authorize('admin'), updateParent);
router.delete('/:id', authorize('admin'), deleteParent);

module.exports = router;
