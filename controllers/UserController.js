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
        var x = await userModel.adduser(name, email, password);
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
