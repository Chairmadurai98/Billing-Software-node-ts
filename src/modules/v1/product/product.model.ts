import { model ,Schema } from "mongoose";

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Catgeory",
        },
        price: {
            type: Number,
        },
        tax: {
            type: Number,
        },
        sellingPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON : {
            virtuals : true
        }, toObject : {
            virtuals : true
        }
    }
);

// productSchema.pre("find", async function (next) {
//      if (this instanceof Query) {
//         await this.populate("categoryId").exec();
//      }

//     next();
// });

productSchema.virtual('label').get(function(){
    const label = this.productName
    return label
})
productSchema.virtual('value').get(function(){
    const value = this._id
    return value
})

const productModel = model("Product", productSchema);

export default productModel;
