
//UserController.js in controllers folder
const userModel = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
    static async getallcraftskills(req, res) {
        var results = await userModel.getcraftskills();
        if (results)
            res.send(results);
    }

    static async getUserById(req, res) {
        const userId = req.params.id; // Assuming userId is passed as a route parameter
        const user = await userModel.getUserById(userId);
    
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found."); // Adjust the error response as needed
        }
    }
    static async getUserByName(req, res) {
        const { name } = req.params; // Assuming name is passed as a route parameter
        const user = await userModel.getUserByName(name);
    
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found.");
        }
    }
    static async getskill(req, res) {
        const { skills } = req.params; // Assuming name is passed as a route parameter
        const skill = await userModel.getoneskills(skills);
    
        if (skill) {
            res.send(skill);
        } else {
            res.status(404).send("There is no skills in the library.");
        }
    }
    static async getAllSkills(req, res) {
        try {
            const skills = await userModel.getAllSkills();
            res.send(skills);
        } catch (error) {
            console.error("Error retrieving skills:", error);
            res.status(500).send("Internal server error");
        }
    }
    
    
    
    static async addUser(req, res) {
        const { id, name, email, password, city, location, phone, gender } = req.body;
    
        try {
            await userModel.addUser(id, name, email, password, city, location, phone, gender);
            res.send("User added successfully");
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).send("Internal server error");
        }
    }
    
    

    static async deleteuser(req, res) {
        const { id } = req.body;
        const { user } = req; // Extract authenticated user information
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }

        // Check if the authenticated user has admin role
        if (user.role !== 'admin') {
            return res.status(403).send("You do not have permission to delete users.");
        }

        // Proceed with user deletion
        if (id) {
            try {
                const result = await userModel.deleteuser(id);
                if (result) {
                    return res.send("User deleted successfully");
                } else {
                    return res.send("Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                return res.status(500).send("Internal server error");
            }
        }
    }
    static async updateuser(req, res) {
        const id = req.body.id;
        const newname = req.body.name;
        const newemail = req.body.email;
        const newpass = req.body.password;

        var x = await userModel.edit(id, newname, newemail, newpass);
        if (x)
            res.send("updated successfully");
        else
            res.send("update failed");
    }
}

module.exports = UserController;
