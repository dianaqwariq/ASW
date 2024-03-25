const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post("/allproject/skills", [
    check("skill").custom((value, { req }) => {
        if (!value || !value.match(/^[a-zA-Z]+$/)) {
            throw new Error("skill should contain only letters");
        }
        return true;
    })
], ProjectController.getProjectsBySkill);


router.post("/allproject/skills/projectID", [
    check("projectID").custom((value, { req }) => {
        if (!value) {
            throw new Error("id is required");
        }
        if (isNaN(value)) {
            throw new Error("id should be only number");
        }
        return true; // Indicates the success of the validation
    })
], ProjectController.getProjectByID);

 

  
router.post("/allproject/skills/projectID/:projectID/feedback", [
    check("feedback").notEmpty().withMessage("feedback is required")
], ProjectController.addFeedbackToProject);


  
router.post("/allproject/skills/projectID/:projectID/Raiting", [
    check("Raiting").notEmpty().withMessage("Raiting is required")
], ProjectController.addRaitingToProject);


router.get("/allproject", (req, res) => {
    res.write('  Choose the skills you are interested in: \n \n * Embroidery.\n \n*Recycling.\n \n*Glass industry.\n \n*Sewing.\n \n *Pottery\n \n *Soap production \n \n *Candle making\n \n');
    res.end();
});



router.patch("/allproject/skills/projectID/:projectID/updatefeedback",  ProjectController.updatefeedback);

router.patch("/allproject/skills/projectID/:projectID/deletefeedback", ProjectController.deleteLastFeedback);

module.exports = router;
