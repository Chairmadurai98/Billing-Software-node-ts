import mongoose from "mongoose";
import catgeoryModel from "./category.model";

export const populateProduct = {
    path: "products",
    select: "-categoryId",
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
                parentId: "$categoryId",
                value: "$_id"
            }
        }]
    }
}]

export const findCategoryById = async (_id: string)=>{
    try {
        const category = catgeoryModel.findOne({
            _id,
            deletedAt : null
        }).exec()
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
