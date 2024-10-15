import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import catgeoryModel from "./order.model";
import orderModel from "./order.model";

export const getAllOrder = async (_req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.find();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.findById(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = await orderModel.create(req.body);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
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

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.findByIdAndDelete(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
