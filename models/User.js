const db = require("../config/db");

class UserModel {
    static async getcraftskills() {
        return new Promise(resolve => {
            db.query("SELECT * FROM library", [], (error, results) => {
                if (!error)
                    resolve(results);
                else
                
                    resolve([]); // Handle error appropriately
            });
        });
    }

    static async getUserById(userId) {
        return new Promise(resolve => {
            db.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
                if (!error && results.length > 0)
                    resolve(results[0]); // Return the first result (assuming user_id is unique)
                else
                    resolve(null); // Handle error or user not found appropriately
            });
        });
    }
    static async getUserByName(name) {
        return new Promise(resolve => {
            db.query("SELECT * FROM users WHERE name = ?", [name], (error, results) => {
                if (!error && results.length > 0) {
                    resolve(results[0]); // Return the first result (assuming name is unique)
                } else {
                    resolve(null); // Handle error or user not found appropriately
                }
            });
        });
    }
    static async getoneskills(skills) {
        return new Promise(resolve => {
            db.query("SELECT * FROM library WHERE skills = ?", [skills], (error, results) => {
                if (!error && results.length > 0) {
                    resolve(results[0]); // Return the first result (assuming name is unique)
                } else {
                    resolve(null); // Handle error or user not found appropriately
                }
            });
        });
    }
    static async getAllSkills() {
        return new Promise(resolve => {
            db.query("SELECT skills FROM library", (error, results) => {
                if (!error) {
                    const skills = results.map(row => row.skills); // Extract the skills from each row
                    resolve(skills); // Return only the skills column from the library table
                } else {
                    console.error("Error retrieving skills:", error);
                    resolve([]); // Handle error appropriately
                }
            });
        });
    }
    
    
    

    static async addUser(id, name, email, password, city, location, phone, gender) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users (id, name, email, password, city, location, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [id, name, email, password, city, location, phone, gender],
                (error, result) => {
                    if (error) {
                        console.error("Error adding user:", error);
                        reject(error); // Reject with error if insertion fails
                    } else {
                        resolve(result); // Resolve with the result if insertion succeeds
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

    static async updateUserById(id,name, email, password,city,location,phone,gender) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE users SET name = ?, email = ?, password = ?, city=?, location=?, phone=?, gender=? WHERE id = ?", [id,name, email, password,city,location,phone,gender], (error, result) => {
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

module.exports = UserModel;