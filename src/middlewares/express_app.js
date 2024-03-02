const { serviceResponse } = require("@src/utils/helpers/api_response")
const { default: rateLimit } = require("express-rate-limit")

exports.handleCatchError = (err, req, res, next) => {
    try {
        let { status, error } = JSON.parse(err)
        // Your Error Handling Here
        return res.json(new serviceResponse({ status: status, errors: [{ message: error }] }))
    } catch (err) {
        return res.json(new serviceResponse({ status: 500, error: [{ message: err.message }] }))
    }
}

exports.handleRouteNotFound = (req, res) => {
    try {
        return res.json(new serviceResponse({ status: 404, error: "Route not found." }))
    } catch (err) {
        return res.json(new serviceResponse({ status: 404, error: err.message }))
    }
}

exports.handleCors = (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    } catch (err) {
        return res.json(new serviceResponse({ status: 404, error: err.message }))
    }
}


exports.handleRateLimit = (req, res, next) => {
    try {
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            // store: ... , // Use an external store for consistency across multiple server instances.
            statusCode: 429,
            message: new serviceResponse({ status: 429, error: "Too many request." })
        })
        next();
    } catch (err) {
        return res.json(new serviceResponse({ status: 404, error: err.message }))
    }
}
