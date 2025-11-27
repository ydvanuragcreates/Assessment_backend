const Task = require('../models/Task');
const Employee = require('../models/Employee');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (authenticated users only)
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, employee } = req.body;

    // Verify employee exists
    const employeeExists = await Employee.findById(employee);
    if (!employeeExists) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      employee
    });

    const populatedTask = await Task.findById(task._id).populate('employee', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: populatedTask
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks with filters
// @route   GET /api/tasks
// @access  Public
exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, employee, priority } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (employee) filter.employee = employee;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .populate('employee', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Public
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('employee', 'name email role');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private (authenticated users only)
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // If employee is being updated, verify new employee exists
    if (req.body.employee) {
      const employeeExists = await Employee.findById(req.body.employee);
      if (!employeeExists) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('employee', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (authenticated users only)
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
