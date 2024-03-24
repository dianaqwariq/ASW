//Usercontroller in controllers folder
const userModel = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
    static async getalluser(req, res) {
        var results = await userModel.getusers();
        if (results)
            res.send(results);
    }

    static async addnewuser(req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var skills=req.body.skills;
        const userSkills = skills || null;
        var x = await userModel.adduser(name, email, password,skills);
        if (x === true)
            res.send("added successfully");
        else
            res.send("add failed");
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
    static async getUserById(req, res) {
        const userId = req.params.userId; // Assuming userId is passed as a route parameter
        const user = await userModel.getUserById(userId);
    
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found."); // Adjust the error response as needed
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