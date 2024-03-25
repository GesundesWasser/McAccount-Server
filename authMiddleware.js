// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization; // Assuming token is sent in the Authorization header

    if (!token) {
        return res.status(403).send('Token not provided');
    }

    jwt.verify(token, '1admin1', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
