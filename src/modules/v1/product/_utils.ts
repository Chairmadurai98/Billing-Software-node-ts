import mongoose from "mongoose";
import productModel from "./product.model";

export const populateCategory = {
    path: "categoryId",
    select: "-products",
    match: { deletedAt: null },
};

export const projectCategoryLookup = {
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
}

export const projectCategory = [{
    ...projectCategoryLookup
}, {
    $unwind: {
        path: "$categoryId",
        preserveNullAndEmptyArrays: true
    }
},{
    $project  : {
        label : "$productName",
        value : "$_id",
        categoryId : 1,
        description : 1,
        price : 1,
        tax : 1,
        productName : 1,
    }
}]


 
export const findProductList =async ()=>{
        try {
            const  product = await productModel.find({
                deletedAt : null
            }).populate(populateCategory).exec()
            if (!product) {
                throw "Product not found"
            }
            return product
        } catch (error) {
            throw error;
        }
}


export const findProductById = async (_id: string, populate = false)=>{
    try {
        const product = productModel.findOne({
            _id,
            deletedAt : null
        }).populate(populate ? populateCategory : null as never). exec()
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
