class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 'fail' for client errors, 'error' for server errors
        this.isOperational = true; // Indicates it's an operational error
        
        // Capture stack trace (excluding constructor)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
