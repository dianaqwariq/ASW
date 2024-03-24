const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateTokenHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY || 'fallbackSecret', (err, user) => {
            if (err) {
                console.error(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY || 'fallbackSecret', { expiresIn: '24h' });
};

module.exports = {
    generateToken,
    authenticateTokenHandler
};
