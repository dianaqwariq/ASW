const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Define routes
router.get('/', projectController.getAllProjects);


// POST add a new project
router.post('/addProject', projectController.addProject);


// GET projects by group size
router.get('/search', projectController.getProjectsByGroupSize);



module.exports = router;