const { Router } = require("express");
const {
    login,
    registerNewAccount,

} = require('../models/user_crud');

const userProfileRouts = Router();

userProfileRouts.post('/register', registerNewAccount);

userProfileRouts.post('/login', login);


module.exports = userProfileRouts;
