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
       
        const id = req.body.id;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors.array());
        } else {
            if (id) {
                var result = await userModel.deleteuser(id);
                if (result)
                    res.send("delete done");
                else
                    res.send("failed to delete");
            }
        }
    }
}