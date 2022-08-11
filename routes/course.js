const router = require('express').Router();
const courseController = require('../controllers/course');
const { courseInputValidation } = require('../utils/validation');
const verify = require('../utils/isAuth');

router.get('/all', verify, courseController.getAllCourses);
router.post('/create', verify, courseInputValidation, courseController.create);
router.get('/single/:id', verify, courseController.getSingleCourse);
router.delete('/delete/:id', verify, courseController.deleteCourse);
router.put(
    '/update/:id',
    verify,
    courseInputValidation,
    courseController.updateCourse
);
module.exports = router;
