const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const tokenBearer = req.header('authorization');
    if (!tokenBearer) {
        return res.status(401).json({ msg: 'Access Denied.', status: false });
    }
    const token = tokenBearer.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.userId = decodedToken.userId;
        const user = await User.findById(req.userId);
        if (!user) {
            return res
                .status(404)
                .json({
                    status: false,
                    msg: 'No User found or your token has expired.',
                });
        }
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized. You need to sign in to get the token.',
        });
    }
};

module.exports = verifyToken;
