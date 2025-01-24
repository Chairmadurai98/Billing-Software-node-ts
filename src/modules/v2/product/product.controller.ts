import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import productModel from "./product.model";
import { findProductById } from "./_utils";

export const getAllProduct = async (_req: Request, res: Response) => {
    try {
        const data = await productModel.find({
            deletedAt: null
        }).exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        //Not found throws error

        const data = await findProductById(_id);

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
        const { _id } = req.params;
        //Not found throws error
        await findProductById(_id);

        const data = await productModel.findByIdAndUpdate(_id, req.body).exec();

        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        //Not found throws error
        await findProductById(_id);
        const data = await productModel
            .findByIdAndUpdate(_id, {
                deletedAt: new Date(),
            })
            .exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
