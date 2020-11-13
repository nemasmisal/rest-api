const Course = require('../models/courseModel');

const inputReqs = {
    titleLength: 4
}

async function courseValidator(req, res, next) {
    const { title } = req.body;
    if (title.length < inputReqs.titleLength) { return res.status(400).send({ msg: `Title length must be at least ${inputReqs.titleLength} symbols` }); }
    const existingCourse = await Course.exists({ title });
    if (existingCourse) { return res.status(409).send({ msg: 'This course is already exist, please create different one or join the existing one' }); }
    return next();
}

async function isCreator(req, res, next) {
    const { userId } = req.body;
    const courseId = req.params.id
    if (!userId || !courseId) { return res.status(401).send({ msg: 'Providing credentials is required.' }); }
    await Course.findById(courseId, (err, course) => {
        if (err) {
            return res.status(404).send({ msg: 'Course with provided ID do not exist' });
        }
        if (course.creator.toString() !== userId) { return res.status(401).send({ msg: "Only creator of the course can modify it." }); }
        return next();
    });
}

module.exports = {
    courseValidator,
    isCreator
}
