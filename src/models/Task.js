const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value >= new Date();
        },
        message: 'Due date cannot be in the past'
      }
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Task must be assigned to an employee']
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient queries
taskSchema.index({ status: 1, employee: 1 });
taskSchema.index({ employee: 1 });

module.exports = mongoose.model('Task', taskSchema);
