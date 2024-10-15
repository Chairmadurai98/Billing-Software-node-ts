class ApiError extends Error {
    public errors: Error | null; // Store additional errors
    public status: number; // Store the status code

    constructor(errors: Error | null = null, status = 500, message = '') {
        super(message);

        this.errors = errors; 
        this.status = status; 
        this.message = message;
        // Capture the stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error().stack; // Fallback for environments that don't support captureStackTrace
        }
    }
}