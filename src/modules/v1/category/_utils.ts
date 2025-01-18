import mongoose from "mongoose";
import catgeoryModel from "./category.model";

export const populateProduct = {
    path: "products",
    select: "-categoryId -_id -__v",
    match: { deletedAt: null },
};

export const projectProduct = [{
    $lookup: {
        as: "products",
        from: "products",
        localField: "products",
        foreignField: "_id",
        pipeline: [{
            $project: {
                _id: 0,
                "label": "$productName",
                value: "$_id"
            }
        }]
    }
}]

export const findCategoryList =async ()=>{
    try {
        const  product = await catgeoryModel.find({
            deletedAt : null
        }).populate(populateProduct).exec()
        if (!product) {
            throw "Category not found"
        }
        return product
    } catch (error) {
        throw error;
    }
}

export const findCategoryById = async (_id: string, populate = true)=>{
    try {
        const category = catgeoryModel.findOne({
            _id,
            deletedAt : null
        }).populate(populate ? populateProduct : null as never).exec()
        if (!category) {
            throw "Catgeory not found"
        }
        return category
    } catch (error) {
        
    }
}

export const findCategoryByAggregate = async (_id: string,) => {
    try {
        const [category] = await catgeoryModel.aggregate([{
            $match: {
                _id: new mongoose.Types.ObjectId(_id),
                deletedAt: null
            }
        },
        ...projectProduct
        ]).exec();
        if (!category) {
            throw "Catgeory not found"
        }
        return category;
    } catch (error) {
        throw error
    }
};