const express = require('express');
const router = express.Router();
const projectController = require('../controllers/libraryControllers');


router.get('/allProjects', projectController.getAllProjects);
router.post('/addProject', projectController.addProject);
router.get('/search', projectController.getProjectsByGroupSize);


module.exports = router;