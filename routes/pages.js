//pages.js in routes 
const express = require("express");
// const authController = require("../controllers/auth.js");
const router = express.Router();


// router.get('/', authController.isLoggedIn, (req, res) => {
//     res.sendFile("signup.html", { root: './public/' })
// });

router.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: './public/' })
});

router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});

module.exports = router;