import { model, Schema, models } from "mongoose";
const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        tamilName: {
            type: String,
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }, toObject: {
            virtuals: true
        }
    }
);


productSchema.virtual('label').get(function () {
    const label = this.productName + ' - ' + this.tamilName
    return label
})
productSchema.virtual('value').get(function () {
    const value = this._id
    return value
})

const productModel = models.Product || model("Product", productSchema);

export default productModel;
