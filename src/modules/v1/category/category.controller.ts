import { Request, Response } from "express";
import { CustomResponse } from "../../../_utils/helpers";
import catgeoryModel from "./category.model";
import { findCategoryById, populateProduct } from "./_utils";
import productModel from "../product/product.model";

export const getAllCategory = async (_req: Request, res: Response) => {
    try {
        const data = await catgeoryModel.find({
            deletedAt: null
        }).populate(populateProduct)
            .exec();
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        //Not found throws error
        const data = await findCategoryById(_id)
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
        const { _id } = req.params;
        //Not found throws error
        await findCategoryById(_id);

        const data = await catgeoryModel.findByIdAndUpdate(_id, req.body);
        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        //Not found throws error
        await findCategoryById(_id);
        const [data] = await Promise.all([
            await catgeoryModel.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        deletedAt: new Date(),
                    },
                },
                {
                    new: true,
                }
            ),
            await productModel.updateMany(
                {
                    categoryId: _id,
                    deletedAt: null
                },
                { $set: { deletedAt: new Date() } },
                {
                    new: true,
                }
            ),
        ]);


        CustomResponse.success({ res, data });
    } catch (error) {
        CustomResponse.error({ res, error });
    }
};
