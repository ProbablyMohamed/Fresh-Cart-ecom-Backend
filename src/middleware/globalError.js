const globalError = (err, req, res, next) => {
    // Set default values for statusCode and status
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    // Send JSON response with error details
    res.status(statusCode).json({
        status,
        message: err.message,
    });
};

export default globalError;
