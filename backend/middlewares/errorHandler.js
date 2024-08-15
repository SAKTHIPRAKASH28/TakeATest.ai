const {statusCodes} = require('../constants')
const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode  ? res.statusCode : 500;
    let title;
    switch(statusCode){
        case statusCodes.NOT_FOUND:
            title="Not Found"
            break;
        case statusCodes.FORBIDDEN:
            title="Forbidden"
            break;
        case statusCodes.VALIDATION_ERROR:
            title="Validation Error"
            break;
        case statusCodes.UNAUTHORIZED:
            title="Unauthorized"
            break;
        case statusCodes.SERVER_ERROR:
            title="Server Error"
            break;
        default:
            break;

    }
    res
    .status(statusCode)
    .json(
        {
            title,
            message:err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        }
    )


};


module.exports =errorHandler;

