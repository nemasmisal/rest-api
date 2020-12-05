module.exports = function globalErrorHandler(err, req, res, next) {
    if (err) {
        return res.status(500).send('Internal Server Error')
    }
}
