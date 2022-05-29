const errorHandler = (err, req, res, next) => {
    const errorStatus = res.statusCode || 500
    res.status(errorStatus)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}