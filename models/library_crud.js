

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aswe"
});




const getAllProjects = (callback) => {
  const query = 'SELECT * FROM library';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};




const addProject = (projectData, callback) => {
  const { ProjectID, ownerID, skills, materials, group_size } = projectData;
  const query = 'INSERT INTO library (ProjectID, ownerID, skills, materials, group_size) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [ProjectID, ownerID, skills, materials, group_size], (err, result) => {
    if (err) {
      console.error('Error adding project:', err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};



const getProjectsByGroupSize = (groupSize, callback) => {
  const query = 'SELECT * FROM library WHERE group_size = ?';
  db.query(query, [groupSize], (err, results) => {
    if (err) {
      console.error('Error searching projects by group size:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};




module.exports = {
  getAllProjects,
  addProject,
  getProjectsByGroupSize

};
