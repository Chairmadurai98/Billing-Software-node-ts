import { Response } from "express";

export const CustomResponse: CustomResponseType<Response> = {
    success: ({ res, data = [], message = "success", status = 200 }) => {
        return res.status(status).json({
            status: true,
            message,
            data,
        });
    },
    error: ({ res, error, status = 500 }) => {
        const errorMessage = new Error((error as never))?.message
        return res.status(status).json({
            status: false,
            error : errorMessage,

        });
    },
};
