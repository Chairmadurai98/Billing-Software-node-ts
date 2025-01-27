import productModel from "../product/product.model"



export const essentialList: EssentialListTypeAsyncV2 = {
    'Product': async () => {
        try {
            const products = await productModel.aggregate([{
                $match: {
                    deletedAt: { $eq: null }  // Exclude documents with a non-null 'deletedAt'
                }
            }, {
                $project: {
                    label: "$tamilName",
                    value: "$_id",
                    productName: 1,
                    tamilName: 1
                }
            }]).exec()
            return products
        } catch (error) {
            return null
        }
    },
} 