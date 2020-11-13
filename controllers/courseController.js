const Course = require('../models/courseModel');

module.exports = {
    async createCourse(req, res, next) {
        const { title, userId } = req.body;
        const course = new Course({ title, creator: userId });
        await course.save((err, doc) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.status(201).send(doc);
        })
    },
    async editCourse(req, res, next) {
        const courseId = req.params.id
        await Course.findByIdAndUpdate(courseId, req.body, (err, doc) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.status(202).send({ msg: 'Course successfully updated.', doc });
        })
    },
    async getCourseById(req, res, next) {
        const courseId = req.params.id
        await Course.findById(courseId, (err, doc) => {
            if (err) { return res.status(400).send({ msg: 'Course with provided ID do not exist.' }) }
            return res.send(doc);
        });
    },
    async getAllCourses(req, res, next) {
        await Course.find({}, (err, courses) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.send(courses);
        });
    },
    async removeCourse(req, res, next) {
        const courseId = req.params.id;
        await Course.findByIdAndDelete(courseId, (err, doc) => {
            if (err) { return res.status(400).send({ msg: 'Course with provided ID do not exist' }) }
            return res.status(202).send({ msg: 'Course successfully deleted.', doc })
        });
    }
}