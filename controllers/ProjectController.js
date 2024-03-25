const ProjectModel = require('../models/ProjectModel');
const { validationResult } = require('express-validator');

class ProjectController {
  
  
    static async getProjectsBySkill(req, res) {
       
        const skill = req.body.skill;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors.array());
        } else {
            if (skill) {
                var result = await ProjectModel.getProjectsBySkill(skill);
                if (result)
                    res.send(result);
                else
                    res.send("failed ");
            }
        }
    }

    static async getProjectByID(req, res) {
     
    const projectID = req.body.projectID;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.array());
    } else {
        if (projectID) {
            var result = await ProjectModel.getProjectByID(projectID);
            if (result)
                res.send(result);
            else
                res.send("failed ");
        }
    }

} 

static async addFeedbackToProject(req, res) {
    const { projectID } = req.params;
    const feedback = req.body.feedback;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.array());
    } else {
        try {
            const result = await ProjectModel.addFeedbackToProject(projectID, feedback);
            res.status(200).json({ message: 'Your comment has been added successfully'  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}





static async addRaitingToProject(req, res) {
    const { projectID } = req.params;
    const Raiting = req.body.Raiting;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.array());
    } else {
        try {
            const result = await ProjectModel.addRaitingToProject(projectID, Raiting);
            res.status(200).json({ message: 'Your Raiting has been added successfully'  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

static async updatefeedback(req, res) {
    const { projectID } = req.params;
    const feedback = req.body.feedback;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors.array());
    } else {
        try {
            const result = await ProjectModel.updatefeedback(projectID, feedback);
            res.status(200).json({ message: 'Your comment has been update successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}

static async deleteLastFeedback(req, res) {
    const { projectID } = req.params;
    try {
        const result = await ProjectModel.deleteLastFeedback(projectID);
        res.status(200).json({ message: 'Last feedback deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

}

module.exports = ProjectController;
