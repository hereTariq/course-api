const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg;
        return res.status(422).json({ status: false, error });
    }
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        const savedUser = await user.save();
        return res.status(201).json({
            status: true,
            msg: 'user created successfully',
            user: savedUser,
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg;
        return res.status(422).json({ status: false, error });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: 'Email or Password is incorrect',
                status: false,
            });
        }
        const matchPasswd = await bcrypt.compare(password, user.password);
        if (!matchPasswd) {
            return res.status(401).json({
                error: 'Email or Password is incorrect',
                status: false,
            });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: '5h' }
        );
        res.status(200).json({
            status: true,
            user,
            token,
            msg: 'Auth successful',
        });
    } catch (err) {
        next(err);
    }
};
