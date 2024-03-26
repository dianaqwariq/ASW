// authMiddleware.js

const jwt = require('jsonwebtoken');

const authdelete = (permissions) => {
    return (req, res, next) => {
        // Extract token from request headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }
        
        // Verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token" });
            }

            // Extract user role from decoded token
            const userRole = decodedToken.role;

            // Check if user role has permission to delete users
            if (permissions.includes(userRole)) {
                next();
            } else {
                return res.status(403).json({ error: "You do not have permission to delete users" });
            }
        });
    };
};

module.exports = { authdelete };
