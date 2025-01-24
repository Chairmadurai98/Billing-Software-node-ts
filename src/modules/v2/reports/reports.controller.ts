import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";

export const  getReports = async (_req: Request, res: Response) => {
    try {
        // const data = await catgeoryModel.find();
        CustomResponse.success({ res, data : [] });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
}