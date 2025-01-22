import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import orderModel from "./order.model";

export const getAllOrder = async (req: Request, res: Response) => {
    const { from  = null, to = null } = req.query
    const query : {createdAt?: { $gte?: Date | string , $lte?: Date | string }} = {}

// Validate and apply `from` date filter if provided
if (from) {
    query.createdAt = { $gte: from };  // If `from` is provided, filter by `createdAt >= from`
  }
  
  // Validate and apply `to` date filter if provided
  if (to) {
    query.createdAt = { ...query.createdAt, $lte: to };  // If `to` is provided, filter by `createdAt <= to`
  }
    // from && (query.createdAt.from = new Date(from))
    // to && (query.createdAt.to =  new Date(to))

    try {
        const data = await orderModel.find(query).populate('products.productId').sort({
            createdAt : -1
        });
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const data = await orderModel.findById(req.params._id).populate('products.productId');
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
