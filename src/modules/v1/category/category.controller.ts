import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import catgeoryModel from "./category.model";

export const getAllCategory = async (_req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.find().exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.findById(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.create(req.body);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.findByIdAndUpdate(
            req.params._id,
            req.body
        )
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.findByIdAndDelete(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
