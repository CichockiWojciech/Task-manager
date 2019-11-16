const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: { type: String, trim: true, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: Number,
      default: 1,
      validate(value) {
        if (value < 0) throw new Error('Priority must be a positive number');
      },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
