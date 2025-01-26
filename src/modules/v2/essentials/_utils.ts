import productModel from "../product/product.model"



export const essentialList: EssentialListTypeAsyncV2 = {
    'Product': async () => {
        try {
            const products = await productModel.aggregate([ {
                $project: {
                    label: { $concat: ["$productName", " - ", "$tamilName"] },
                    value: "$_id",
                    tamilName: 1
                }
            }]).exec()
            return products
        } catch (error) {
            return null
        }
    },
} 