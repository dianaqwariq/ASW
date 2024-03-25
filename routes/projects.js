const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController1');


router.get('/getAllProjects', projectController.getAllProjects);
router.post('/addProject', projectController.addProject);
router.get('/search', projectController.getProjectsByGroupSize);


module.exports = router;