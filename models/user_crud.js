const bcrypt = require('bcrypt')
const { generateToken } = require("./auth");
const con = require("../config/db");



const queryAsync = async (sql, params) => {
    return new Promise((resolve, reject) => {
        con.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


const registerNewAccount = async (req, res) => {
    try {
        const { NAME: name, EMAIL: email, password, city, location, gender } = req.body;

        const existingUserQuery = "SELECT email FROM users WHERE email = ?";
        const result = await queryAsync(existingUserQuery, [email.toLowerCase()]);

        if (result.length) {
            return res.status(400).send("Email already exists");
        }

        const hashPass = await bcrypt.hash(password, 10);
        const insertProfileQuery = "INSERT INTO users (Name, email, password, city,location,gender) VALUES (?, ?, ?, ?, ?, ?)";
        await queryAsync(insertProfileQuery, [name, email.toLowerCase(), hashPass, city, location, gender]);

        return res.status(201).send("Registration successful. You can now proceed.");
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const deletedQuery = "SELECT * FROM users WHERE email =?";
        const isDeleted = await queryAsync(deletedQuery, email);

        if (isDeleted[0].Deleted === 1)
            return res.status(404).send("User doesn't exist");

        const sql = "SELECT password FROM users WHERE email = ?";
        const result = await queryAsync(sql, [email.toLowerCase()]);

        if (!result || result.length === 0) {
            return res.status(404).send("User doesn't exist");
        }

        const hashedPassword = result[0].password;
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

        if (isPasswordMatch) {
            const userSql = "SELECT * FROM users WHERE email = ?";
            const userResult = await queryAsync(userSql, [email.toLowerCase()]);

            if (userResult && userResult.length > 0) {
                const token = generateToken({
                    EMAIL: userResult[0].email,

                });
                return res.send(token);
            }
        }

        return res.status(401).send("Incorrect email or password");
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal Server Error");
    }
};



module.exports = {
    registerNewAccount,
    login
}