import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import productModel from "./product.model";


export const getAllProduct = async (_req: Request, res: Response) => {
    try {
        const data = await productModel.find().exec()   
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};


export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const data = await productModel.findById(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};


export const createProduct = async (req: Request, res: Response) => {
    try {
        
        const data = await productModel.create(req.body);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        const data = await productModel.findByIdAndUpdate(
            req.params._id,
            req.body
        )
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const data = await productModel.findByIdAndDelete(req.params._id);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
