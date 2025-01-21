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