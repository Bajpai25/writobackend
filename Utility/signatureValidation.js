const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateUser = (req, res, next) => {
  
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
    
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

       
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = authenticateUser;
