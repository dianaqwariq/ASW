const express = require('express');
const ProjectController = require("../controllers/ProjectController");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { authenticateTokenHandler } = require("../models/auth");

router.post("/allproject/skills", authenticateTokenHandler, [
    check("skill").custom((value, { req }) => {
        if (!value || !value.match(/^[a-zA-Z]+$/)) {
            throw new Error("skill should contain only letters");
        }
        return true;
    })
], ProjectController.getProjectsBySkill);


router.post ("/allproject/skills/projectID", authenticateTokenHandler, [
    check("projectID").custom((value, { req }) => {
        if (!value) {
            throw new Error("id is required");
        }
        if (isNaN(value)) {
            throw new Error("id should be only number");
        }
        return true; 
    })
], ProjectController.getProjectByID);

 

  
router.post("/allproject/skills/projectID/:projectID/feedback", authenticateTokenHandler, [
    check("feedback").notEmpty().withMessage("feedback is required")
], ProjectController.addFeedbackToProject);


  
router.post("/allproject/skills/projectID/:projectID/Raiting", authenticateTokenHandler, [
    check("Raiting").notEmpty().withMessage("Raiting is required")
], ProjectController.addRaitingToProject);


router.get("/allproject", authenticateTokenHandler, (req, res) => {
    res.write('  Choose the skills you are interested in: \n \n * Embroidery.\n \n*Recycling.\n \n*Glass industry.\n \n*Sewing.\n \n *Pottery\n \n *Soap production \n \n *Candle making\n \n');
    res.end();
});



router.patch("/allproject/skills/projectID/:projectID/updatefeedback", authenticateTokenHandler,  ProjectController.updatefeedback);

router.patch("/allproject/skills/projectID/:projectID/deletefeedback", authenticateTokenHandler, ProjectController.deleteLastFeedback);

module.exports = router;
