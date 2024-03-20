// authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            const decoded = jwt.verify(req.cookies.userSave, process.env.JWT_SECRET);
            const userId = decoded.id;
            const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
            req.user = user[0];
            next();
        } catch (err) {
            console.error(err);
            next(err); // Pass error to error handler middleware
        }
    } else {
        next(); // No token present, proceed without setting req.user
    }
};