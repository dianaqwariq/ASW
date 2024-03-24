//taskController.js in controllers folder
const tasks = require('../models/tasks');


const getAlltasks = (req, res) => {
    Project.getAlltasks((err, tasks) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Failed to fetch the tasks' });
            return;
        }
        res.json(tasks);
    });
};
const addtask = (req, res) => {
    const taskData = req.body;
    tasks.addtask(taskData, (err, result) => {
      if (err) {
        console.error('Error adding the task:', err);
        res.status(500).json({ error: 'Failed to add tasks' });
        return;
      }
      res.json({ message: 'task added successfully', task_id: result.insertId });
    });
  };


  const updateTaskStatus = (req, res) => {
    const { taskId, newStatus } = req.body;
    tasks.updateTaskStatus(taskId, newStatus, (err, result) => {
      if (err) {
        console.error('Error updating task status:', err);
        res.status(500).json({ error: 'Failed to update task status' });
        return;
      }
      res.json({ message: 'Task status updated successfully' });
    });
  };
  

  module.exports = {
    getAlltasks,
    addtask,
    updateTaskStatus
};
