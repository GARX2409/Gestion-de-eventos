const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'Garay123'); // Clave secreta
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;