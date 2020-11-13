const router = require('express').Router();
const courseController = require('../controllers/courseController');
const { isCreator, courseValidator } = require('../middlewares/courseValidator');
const { existingUser } = require('../middlewares/userValidator');

router.post('/create', existingUser, courseValidator, courseController.createCourse);
router.get('/all', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/edit/:id', existingUser, isCreator, courseController.editCourse);
router.delete('/remove/:id', existingUser, isCreator, courseController.removeCourse);

module.exports = router