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
            return res.status(400).send(
                "Please Provide an email and password !!"
            )
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            console.log(results);
            if (!results || !await bcrypt.compare(password, results[0].password)) {
                res.status(401).send(
                    'Email or Password is incorrect :((')
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, "9(H(*#HD#(*D9tR()d@#R%", {
                    expiresIn: "90d"
                });

                console.log("the token is " + token);
                

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
               
                res.status(200).send('Signin successfully :) . ' + " Your token is: " + token);


            }
        })
    } catch (err) {
        console.log(err);
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
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                "9(H(*#HD#(*D9tR()d@#R%"
            );
            console.log(decoded);

            // Check if the user exists
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                if (results.length === 0) {
                    // User doesn't exist, proceed without setting req.user
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.error(err);
            return next(err);
        }
    } else {
        // No token present, proceed without setting req.user
        next();
    }
};
exports.logout = (req, res) => {
    res.status(200).redirect("/");
}