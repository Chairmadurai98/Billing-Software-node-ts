import { findCategoryList } from "../category/_utils"
import { findProductList } from "../product/_utils"

export const essentialList : EssentialListTypeAsync  = {
    'Product' : async()=>{
        try {
            const products = await findProductList()
            return products
        } catch (error) {
            return null
        }
    },
    'Category' : async()=>{
        try {
            const categories = await findCategoryList()
            return categories  
        } catch (error) {
            return null
        }
    }
} 