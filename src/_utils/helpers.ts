import { Response } from "express";

export class ApiResponse {
    status: number;
    data: unknown;
    message: string;
    success: boolean;
    constructor(status : number, data : unknown, message  = 'Success') {
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status < 400;
    }
}

export class ApiError extends Error {
    status: number;
    errors: Error | null | unknown;
    success: boolean;
    constructor(status : number = 500 , message  = 'Error',errors: Error | null | unknown , stack : string ='') {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
        this.success = false;
        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const CustomResponse: CustomResponseType<Response> = {
    success: ({ res, data = [], message = "success", status = 200 }) => {
        return res.status(status).json(new ApiResponse(status, data, message));
    },
    error: ({ res, error, status = 500 }) => {
        return res.status(status).json(new ApiError(status, error.message, error, error.stack));
    },
};



