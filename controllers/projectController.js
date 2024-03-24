const Project = require('../models/project');


const getAllProjects = (req, res) => {
  Project.getAllProjects((err, projects) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ error: 'Failed to fetch projects' });
      return;
    }
    res.json(projects);
  });
};



const addProject = (req, res) => {
  const projectData = req.body;
  Project.addProject(projectData, (err, result) => {
    if (err) {
      console.error('Error adding project:', err);
      res.status(500).json({ error: 'Failed to add project' });
      return;
    }
    res.json({ message: 'Project added successfully', projectId: result.insertId });
  });
};



const getProjectsByGroupSize = (req, res) => {
  const { groupSize } = req.query;
  Project.getProjectsByGroupSize(groupSize, (err, results) => {
    if (err) {
      console.error('Error searching projects by group size:', err);
      res.status(500).json({ error: 'Failed to search projects by group size' });
      return;
    }
    res.json(results);
  });
};



module.exports = {
  getAllProjects: getAllProjects,
  addProject,
  getProjectsByGroupSize
};
