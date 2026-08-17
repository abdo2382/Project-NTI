const Task = require("../models/task-model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

// GET /api/v1/tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: "success",
      count: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch tasks: ${error.message}`,
    });
  }
};

// GET /api/v1/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// POST /api/v1/tasks
const createTask = async (req, res) => {
  try {
    const priority = req.body.priority?.toLowerCase();
    const status = req.body.status?.toLowerCase();

    const newTask = await Task.create({
      ...req.body,
      priority,
      status,
      attachment: req.file?.filename,
      createdBy: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Task added successfully",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    // If validation failed after the file was already saved, remove the orphaned file
    if (req.file) {
      deleteUploadedFile("tasks", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// PATCH /api/v1/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      if (req.file) deleteUploadedFile("tasks", req.file.filename);

      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // Only the task's owner or an admin can update it
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      if (req.file) deleteUploadedFile("tasks", req.file.filename);

      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to update this task",
      });
    }

    if (req.body.priority) req.body.priority = req.body.priority.toLowerCase();
    if (req.body.status) req.body.status = req.body.status.toLowerCase();

    if (req.file) {
      req.body.attachment = req.file.filename;
      if (task.attachment) deleteUploadedFile("tasks", task.attachment);
    }

    Object.assign(task, req.body);

    const updatedTask = await task.save();

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("tasks", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// DELETE /api/v1/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // Only the task's owner or an admin can delete it
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to delete this task",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (deletedTask.attachment) {
      deleteUploadedFile("tasks", deletedTask.attachment);
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      data: {
        task: deletedTask,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
