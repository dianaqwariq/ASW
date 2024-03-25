//tasks.js in models folder
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aswe"
});

// Get all tasks
const getAlltasks = (callback) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Add a new task
const addtask = (taskData, callback) => {
  const { task_id, task_description, assigned_to, due_date, status } = taskData;
  const query = 'INSERT INTO tasks (task_id, task_description, assigned_to, due_date, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [task_id, task_description, assigned_to, due_date, status], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// Update task status
const updateTaskStatus = (taskId, newStatus, callback) => {
    const query = 'UPDATE tasks SET status = ? WHERE task_id = ?';
    db.query(query, [newStatus, taskId], (err, result) => {
      if (err) {
        console.error('Error updating task status:', err);
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  };

module.exports = {
    getAlltasks,
    addtask,
    updateTaskStatus
};

  