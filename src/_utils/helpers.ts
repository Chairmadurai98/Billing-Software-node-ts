import { Response } from "express";

export const CustomResponse: CustomResponseType<Response> = {
    success: ({ res, data = [], message = "success", status = 200 }) => {
        return res.status(status).json({
            status: true,
            message,
            data,
        });
    },
    error: ({ res, error, status = 500, message = "Error" }) => {
        return res.status(status).json({
            status: false,
            error,
            message,
        });
    },
};
