const db = require("../config/db");

class ProjectModel {
    static async getProjectsBySkill(skill) {
        return new Promise((resolve, reject) => {
            db.query('SELECT projectID, projName, Raiting FROM refrences WHERE skill = ?', [skill], (error, results) => {
                if (!error) {
                    let formattedResults = '';
                    results.forEach((project, index) => {
                        formattedResults += `projectID: ${project.projectID}, projName: ${project.projName}, Raiting: ${project.Raiting}\n\n`;
                    });
                    resolve(formattedResults);
                } else {
                    reject(error); // Handle error appropriately
                }
            });
        });
    }   
    

    

    static async getProjectByID(projectID) {
      


        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM refrences  WHERE projectID = ?', [projectID], (error, results) => {
                if (!error) {
                    
                   resolve(results);
                } else {
                    reject(error); // Handle error appropriately
                }
            });
        });
    }    

    static async addFeedbackToProject(projectID, feedback) {
        return new Promise((resolve, reject) => {
            db.query(' UPDATE refrences SET feedback = CONCAT(IFNULL(feedback, ""), ?) WHERE projectID = ?', [', ' + feedback, projectID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static async addRaitingToProject(projectID, newRaiting) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE refrences SET Raiting = CONCAT(IFNULL(Raiting, ""), ", ", ?) WHERE projectID = ?', [newRaiting, projectID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static async updatefeedback(projectID, feedback) {
        return new Promise((resolve, reject) => {
            // Retrieve all feedback for the specified projectID
            db.query('SELECT feedback FROM refrences WHERE projectID = ?', [projectID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    let allFeedback = results[0].feedback || ''; // Get all feedback
                    let updatedFeedback = ''; // Initialize updated feedback variable
                    if (allFeedback) {
                        // Split the feedback string into an array
                        let allFeedbackArray = allFeedback.split(',');
                        // Remove the last element from the array
                        allFeedbackArray.pop();
                        // Reconstruct the updated feedback string
                        updatedFeedback = allFeedbackArray.join(', ');
                    }
                    // Concatenate the new feedback value
                    updatedFeedback += updatedFeedback ? ', ' + feedback : feedback;
                    
                    // Update the feedback field with the updated value
                    db.query('UPDATE refrences SET feedback = ? WHERE projectID = ?', [updatedFeedback, projectID], (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
    
    static async deleteLastFeedback(projectID) {
        return new Promise((resolve, reject) => {
            db.query('SELECT feedback FROM refrences WHERE projectID = ?', [projectID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    let allFeedback = results[0].feedback || '';
                    let updatedFeedback = '';
                    if (allFeedback) {
                        let allFeedbackArray = allFeedback.split(',');
                        allFeedbackArray.pop();
                        updatedFeedback = allFeedbackArray.join(', ');
                    }
                    
                    db.query('UPDATE refrences SET feedback = ? WHERE projectID = ?', [updatedFeedback, projectID], (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    }
    
      }

module.exports = ProjectModel;
