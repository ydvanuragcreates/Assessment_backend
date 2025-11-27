const Employee = require('../models/Employee');
const { generateToken } = require('../middleware/auth');

// @desc    Register new employee
// @route   POST /api/employees/register
// @access  Public
exports.registerEmployee = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    const employee = await Employee.create({
      name,
      email,
      role,
      password
    });

    const token = generateToken(employee._id);

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      data: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login employee
// @route   POST /api/employees/login
// @access  Public
exports.loginEmployee = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find employee with password field
    const employee = await Employee.findOne({ email }).select('+password');

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await employee.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(employee._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select('-password');

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Public
exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .select('-password')
      .populate('tasks');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};
