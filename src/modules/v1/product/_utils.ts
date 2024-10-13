import productModel from "./product.model";

export const populateCategory = {
    path: "categoryId",
    select: "-products",
    match: { deletedAt: null },
};

export const findProductById = async (_id: string, populate: boolean = true) => {
    try {
        const data = await productModel
            .findOne({
                _id,
                deletedAt: { $eq: null },
            })
            .populate(populate ? populateCategory : (null as never))
            .exec();
        if (!data) {
            throw {
                message: "Product not found",
            };
        }
        return data;
    } catch (error) {
        console.log(error, "data");
        throw error;
    }
};
