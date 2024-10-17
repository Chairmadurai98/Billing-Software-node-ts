import { findCategoryList, projectProduct } from "../category/_utils"
import catgeoryModel from "../category/category.model"
import { projectCategory, projectCategoryLookup } from "../product/_utils"
import productModel from "../product/product.model"



export const essentialList: EssentialListTypeAsync = {
    'Product': async () => {
        try {
            const products = await productModel.aggregate([{
                ...projectCategoryLookup
            }, {
                $unwind: {
                    path: "$categoryId",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    label: "$productName",
                    value: "$_id",
                    parentId: "$categoryId"
                }
            }, {
                $limit: 1
            }]).exec()
            return products
        } catch (error) {
            return null
        }
    },
    'Category': async () => {
        try {
            const categories = await catgeoryModel.aggregate([...projectProduct, {
                $project : {
                    label : "$categoryName",
                    value : "$_id",
                    products : 1
                }
            }]).exec()
            return categories
        } catch (error) {
            return null
        }
    }
} 