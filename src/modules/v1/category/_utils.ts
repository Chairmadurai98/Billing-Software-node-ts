import catgeoryModel from "./category.model";

export const populateProduct = {
    path: "products",
    select: "-categoryId",
    match: { deletedAt: null },
};

export const findCategoryById = async (_id: string, populate: boolean = true) => {
    try {
        const category = await catgeoryModel
            .findOne({
                _id,
                deletedAt: { $eq: null },
            })
            .populate(populate ? populateProduct : (null as never))
            .exec();
        if (!category) {
            throw {
                message: "Category not found",
            };
        }

        return category;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
