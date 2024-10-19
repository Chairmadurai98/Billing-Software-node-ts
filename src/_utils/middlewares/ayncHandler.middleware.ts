import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers';

type HandleParams = (req: Request, res: Response, next: NextFunction) => void;

const asyncHandler = (callback: HandleParams) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // if (error) {
            //     throw new ApiError(error.status || 500, error.message, error.error);
            // }
            return callback(req, res, next);
        } catch (err) {
            throw new ApiError(500, (err as Error).message, err);
        }
    };
};

export default asyncHandler