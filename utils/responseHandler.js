const sendResponse = (res, statusCode, success, data, message) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export default sendResponse;
