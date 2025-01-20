import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import orderModel from "./order.model";

export const getAllOrder = async (req: Request, res: Response) => {

    const { from  = new Date("2022-01-01"), to = new Date() } = req.query
    try {
        const data = await orderModel.find({
            createdAt : {
                $gte : from,
                $lte : to
            }
        }).sort({
            createdAt : -1
        });
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const data = await orderModel.findById(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = new orderModel(req.body);
        const data = await order.save();
        CustomResponse.success({ res, data  });
    } catch (error) {
        console.log(error,"error")
        CustomResponse.error({ res, error });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const data = await orderModel.findByIdAndUpdate(
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
        const data = await orderModel.findByIdAndDelete(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
