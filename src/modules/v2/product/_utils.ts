import mongoose from "mongoose";
import productModel from "./product.model";






export const findProductList = async () => {
    try {
        const product = await productModel.find({
            deletedAt: null
        }).exec()
        if (!product) {
            throw "Product not found"
        }
        return product
    } catch (error) {
        throw error;
    }
}


export const findProductById = async (_id: string) => {
    try {
        const product = productModel.findOne({
            _id,
            deletedAt: null
        }).exec()
        if (!product) {
            throw "Product not found"
        }
        return product
    } catch (error) {
        throw error;
    }
}

export const findProductByAggregate = async (_id: string) => {
    try {
        const data = await productModel
            .aggregate([{
                $match: {
                    _id: new mongoose.Types.ObjectId(_id),
                    deleteAt: null
                }
            }])
            .exec();
        if (!data) {
            throw "Product not found"
        }
        return data;
    } catch (error) {
        throw error;
    }
};
