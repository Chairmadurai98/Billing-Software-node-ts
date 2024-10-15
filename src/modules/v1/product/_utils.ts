import mongoose from "mongoose";
import productModel from "./product.model";

export const populateCategory = {
    path: "categoryId",
    select: "-products",
    match: { deletedAt: null },
};

export const projectCategory = [{
    $lookup: {
        as: "categoryId",
        from: "catgeories",
        localField: "categoryId",
        foreignField: "_id",
        pipeline: [
            {
                $project: {
                    _id: 0,
                    "label": "$categoryName",
                    value: "$_id"
                }
            }]
    }
}, {
    $unwind: {
        path: "$categoryId",
        preserveNullAndEmptyArrays: true
    }
}]
export const findProductById = async (_id: string)=>{
    try {
        const product = productModel.findOne({
            _id,
            deletedAt : null
        }).exec()
        if (!product) {
            throw "Product not found"
        }
        return product
    } catch (error) {
        
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
            }, ...projectCategory])
            .exec();
        if (!data) {
            throw "Product not found"
        }
        return data;
    } catch (error) {
        throw error;
    }
};
