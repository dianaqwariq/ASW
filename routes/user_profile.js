const { Router } = require("express");
const {
    login,
    signup,
} = require('../models/user_crud');


const userProfileRouts = Router();
userProfileRouts.post('/register', signup);
userProfileRouts.post('/login', login);


module.exports = userProfileRouts;
