"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const asyncHandler = (callback) => {
    return (req, res, next) => {
        try {
            // if (error) {
            //     throw new ApiError(error.status || 500, error.message, error.error);
            // }
            return callback(req, res, next);
        }
        catch (err) {
            throw new helpers_1.ApiError(500, err.message, err);
        }
    };
};
exports.default = asyncHandler;
