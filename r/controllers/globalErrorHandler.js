module.exports = function globalErrorHandler(err, req, res, next) {
    if (err) {
        return res.status(err.code).send({ msg: err.msg })
    }
}
