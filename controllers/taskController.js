//taskController.js in controllers folder
const tasks = require('../models/tasks');
const db = require('../config/db'); // Import db connection


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
    const userEmail = req.user.email; // Get the email from the decoded token
    console.log('User Email:', userEmail); // Debugging log

    const updateQuery = 'UPDATE tasks SET status = ? WHERE task_id = ? AND assigned_to = (SELECT id FROM users WHERE email = ?)';
    db.query(updateQuery, [newStatus, taskId, userEmail], (err, result) => {
        if (err) {
            console.error('Error updating task status:', err);
            res.status(500).json({ error: 'Failed to update task status' });
            return;
        }
        if (result.affectedRows === 0) {
            console.log('No rows affected. Task not updated.');
            res.status(404).json({ error: 'Task not found or you are not authorized to update this task' });
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