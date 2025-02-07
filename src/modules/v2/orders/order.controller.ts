import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import orderModel from "./order.model";
import mongoose from "mongoose";
import { aggregateFilter } from "./_utils";
const { Decimal128 } = mongoose.Types;

export const getAllOrder = async (_req: Request, res: Response) => {

    try {
        const data = await orderModel.aggregate([{
            $match: {
                deletedAt: null
            }
        }, ...aggregateFilter])
            .sort({
                createdAt: -1
            }).exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const [data] = await orderModel.aggregate([{
            $match: {
                deletedAt: null,
                _id: new mongoose.Types.ObjectId(req.params.id)
            }
        }, ...aggregateFilter, {
            $limit: 1
        }]).exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        console.log(error, "error")
        CustomResponse.error({ res, error });
    }
};

// const INVOICE_CONSTANTS = "INVOICE"

export const createOrder = async (req: Request, res: Response) => {
    try {
        // const lastOrder = await orderModel.find().sort({ createdAt: -1 }).limit(1);
        // let lastInvoiceId = lastOrder?.[0]?.invoiceId || '';
        const products: any[] = req?.body?.products || []
        const body = {
            products: products.map(product => {
                return {
                    ...product,
                    subTotal: Decimal128.fromString(product.subTotal || '0')
                }
            }),
            customerName: req.body.customerName || '',
            customerAddress: req.body.customerAddress || '',
            total: Decimal128.fromString(req.body.total || '0') || 0
        }
        const order = new orderModel(body);
        const data = await order.save();
        CustomResponse.success({ res, data });
    } catch (error) {
        console.log(error, "error")
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
