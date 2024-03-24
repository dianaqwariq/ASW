//User.js in models folder
const db = require("../config/db");

class UserModel {
    static async getusers() {
        return new Promise(resolve => {
            db.query("SELECT * FROM users", [], (error, results) => {
                if (!error)
                    resolve(results);
                else
                    resolve([]); // Handle error appropriately
            });
        });
    }
    static async getUserById(userId) {
        return new Promise(resolve => {
            db.query("SELECT * FROM users WHERE user_id = ?", [userId], (error, results) => {
                if (!error && results.length > 0)
                    resolve(results[0]); // Return the first result (assuming user_id is unique)
                else
                    resolve(null); // Handle error or user not found appropriately
            });
        });
    }

    static async adduser(name, email, password,skills) {
        return new Promise(resolve => {
            db.query("INSERT INTO users (name, email, password,skills) VALUES (?, ?, ?,?)", [name, email, password,skills], (error, results) => {
                if (!error) {
                    resolve(true); // User added successfully
                } else {
                    console.error("Error adding user:", error);
                    resolve(false); // Failed to add user
                }
            });
        });
    }

    static async deleteuser(id){
        return new Promise((resolve, reject) => {
            db.query("delete from users where id =?",[id],(error,result)=>{
                if(error)
                    resolve(false);
                else 
                    resolve(true);
            });
        });
    }

    static async edit(id, name, email, password) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, password, id], (error, result) => {
                if (error) {
                    console.error("Error editing user:", error);
                    resolve(false); // Failed to edit user
                } else {
                    resolve(true); // User edited successfully
                }
            });
        });
    }
}


class User {
    static async getUserById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = User;
module.exports = UserModel;