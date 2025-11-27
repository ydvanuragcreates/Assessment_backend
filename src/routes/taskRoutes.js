const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validateTask, validateTaskUpdate } = require('../validators/taskValidator');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes (viewing)
router.get('/', optionalAuth, getAllTasks);
router.get('/:id', optionalAuth, getTask);

// Protected routes (modification requires authentication)
router.post('/', protect, validateTask, createTask);
router.put('/:id', protect, validateTaskUpdate, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
