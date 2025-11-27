const { body, validationResult } = require('express-validator');

exports.validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed', 'Cancelled'])
    .withMessage('Status must be one of: Pending, In Progress, Completed, Cancelled'),
  
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Critical'])
    .withMessage('Priority must be one of: Low, Medium, High, Critical'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date'),
  
  body('employee')
    .notEmpty().withMessage('Employee ID is required')
    .isMongoId().withMessage('Invalid employee ID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

exports.validateTaskUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed', 'Cancelled'])
    .withMessage('Status must be one of: Pending, In Progress, Completed, Cancelled'),
  
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Critical'])
    .withMessage('Priority must be one of: Low, Medium, High, Critical'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date'),
  
  body('employee')
    .optional()
    .isMongoId().withMessage('Invalid employee ID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];
