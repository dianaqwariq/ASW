
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
        const userId = req.params.id;
        const user = await userModel.getUserById(userId);
    
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found."); 
        }
    }
    static async getUserByName(req, res) {
        const { name } = req.params; 
        const user = await userModel.getUserByName(name);
    
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found.");
        }
    }
    static async getskill(req, res) {
        const { skills } = req.params; 
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
        const { user } = req; 
        const errors = validationResult(req);

    
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }

        // Check if the authenticated user has admin role
        if (user.role !== 'admin') {
            return res.status(403).send("You do not have permission to delete users.");
        }

      
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
        const { id } = req.params;
        const { name, email, password, city, location, phone, gender } = req.body;
        const user = req.user; 
    
        if (!user || (user.role !== 'admin' && user.id !== id)) {
            return res.status(403).send("You do not have permission to update this user.");
        }
    
        try {
            if (user.role === 'admin' || user.id === id) {
                const result = await userModel.updateUserById(id, name, email, password, city, location, phone, gender);
                if (result) {
                    return res.send("User updated successfully");
                } else {
                    return res.status(404).send("User not found or failed to update user");
                }
            } else {
                return res.status(403).send("You do not have permission to update this user.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).send("Internal server error");
        }
    }
    
    
    
    
}

module.exports = UserController;
