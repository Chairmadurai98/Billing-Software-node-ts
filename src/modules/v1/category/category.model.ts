import { model, Schema } from "mongoose";

const catgeorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        products: [
            {
                ref: "Product",
                type: Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
        toJSON : {
            virtuals : true
        },
        toObject : {
            virtuals : true
        },
    }
);

// catgeorySchema.pre("find", async function () {
//     await this.populate({
//         path: "products",
//         select: "-categoryId",
//     }).exec();
// });

catgeorySchema.virtual('label').get(function(){
    const label = this.categoryName
    return label
})
catgeorySchema.virtual('value').get(function(){
    const value = this._id
    return value
})

const catgeoryModel = model("Catgeory", catgeorySchema);

export default catgeoryModel;
