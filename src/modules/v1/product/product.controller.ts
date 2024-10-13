import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import productModel from "./product.model";
import { findProductById, populateCategory } from "./_utils";
import catgeoryModel from "../category/category.model";
import { findCategoryById } from "../category/_utils";

export const getAllProduct = async (_req: Request, res: Response) => {
    try {
        const data = await productModel.find({
            deletedAt : null
        }).populate(populateCategory).exec();
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
        const { categoryId } = req.body
        const data = await productModel.create(req.body);
        await findCategoryById(categoryId)
        if(data?._id){
            
            categoryId && (await catgeoryModel.findByIdAndUpdate(categoryId, {
                $push : {
                    products : data._id
                }
            }, {
                new : true
            }))
        }
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
        await findProductById(_id, false);
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
