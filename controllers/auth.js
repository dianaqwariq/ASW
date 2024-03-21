
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "aswe"
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Please Provide an email and password !!");
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error("Error retrieving user:", err);
                return res.status(500).send('Internal Server Error');
            }

            if (!results || results.length === 0 || !await bcrypt.compare(password, results[0].password)) {
                return res.status(401).send('Email or Password is incorrect :((');
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, "9(H(*#HD#(*D9tR()d@#R%", {
                    expiresIn: "90d"
                });

                console.log("the token is " + token);

                return res.status(200).send(`Signin successfully :) . Your token is: ${token} <br> <a href="/chat">Chat</a>`);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}


exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, password, skills, description } = req.body;
    if (!name || !email || !password || !skills || !description) {
        return res.status(401).send(
            "Please provide all informations !!"
        )
    }
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            return res.status(401).send('The email is already in use');
        }
        try {
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword, skills: skills, description: description }, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error registering user');
                } else {
                    return res.send('User registered');
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error hashing password');
        }
    });
};


exports.isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.userSave) {
            const decoded = jwt.verify(req.cookies.userSave, "9(H(*#HD#(*D9tR()d@#R%");
            req.user = decoded;
            next();
        } else {
            res.redirect('/login'); // Redirect to login if token is not present
        }
    } catch (err) {
        console.error("Error decoding token:", err);
        res.redirect('/login'); // Redirect to login if token is invalid
    }
};


exports.logout = (req, res) => {
    res.status(200).redirect("/");
}