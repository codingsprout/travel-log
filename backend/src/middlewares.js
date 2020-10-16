const notFound = (req, res, next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(err);
}

const errHandler = (error, req, res, next) => {
    const statCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🤔' : error.stack,
    })
}

module.exports = { notFound, errHandler }