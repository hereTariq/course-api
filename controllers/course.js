const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Course = require('../models/course');
const User = require('../models/user');

exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        if (!courses) {
            return res
                .status(404)
                .json({ error: 'course not found', status: false });
        }
        res.status(200).json(courses);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg;
        return res.status(422).json({ error, status: false });
    }
    const data = req.body;
    userId = req.userId;
    try {
        const course = new Course({ ...data, userId });
        await course.save();

        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ status: false, error: 'user not found' });
        }
        user.courses.push(course);
        await user.save();
        res.status(201).json({
            status: true,
            msg: 'course created successfully.',
            course,
        });
    } catch (err) {
        next(err);
    }
};

exports.getSingleCourse = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ status: false, error: 'id is not valid' });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res
                .status(404)
                .json({ status: false, error: 'course not found' });
        }

        res.status(200).json({ status: true, course });
    } catch (err) {
        next(err);
    }
};

exports.deleteCourse = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ status: false, error: 'id is not valid' });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res
                .status(404)
                .json({ error: 'course not found', status: false });
        }

        if (course.userId != req.userId) {
            return res.status(401).json({
                error: 'You are not authorized person to delete this course',
                status: false,
            });
        }
        const deletedCourse = await Course.findByIdAndRemove(id);
        const user = await User.findById(req.userId);
        user.courses.pull(id);
        await user.save();
        res.status(200).json({
            status: true,
            msg: 'course successfully removed.',
            deletedCourse,
        });
    } catch (err) {
        next(err);
    }
};

exports.updateCourse = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json({ status: false, error: 'id is not valid' });
    }

    const course = await Course.findById(id);
    if (!course) {
        return res
            .status(404)
            .json({ error: 'Course not found.', status: false });
    }

    if (course.userId != req.userId) {
        return res.status(401).json({
            error: 'You are not authorized person to update this course',
            status: false,
        });
    }
    const updatedCourse = await Course.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
    });
    res.status(200).json({
        msg: 'course updated successfully',
        status: true,
        updatedCourse,
    });
};
