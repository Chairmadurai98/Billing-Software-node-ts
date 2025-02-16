"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = exports.ApiError = exports.ApiResponse = void 0;
class ApiResponse {
    constructor(status, data, message = 'Success') {
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status < 400;
    }
}
exports.ApiResponse = ApiResponse;
class ApiError extends Error {
    constructor(status = 500, message = 'Error', errors, stack = '') {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.success = false;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
exports.CustomResponse = {
    success: ({ res, data = [], message = "success", status = 200 }) => {
        return res.status(status).json(new ApiResponse(status, data, message));
    },
    error: ({ res, error, status = 500 }) => {
        return res.status(status).json(new ApiError(status, error.message, error, error.stack));
    },
};
