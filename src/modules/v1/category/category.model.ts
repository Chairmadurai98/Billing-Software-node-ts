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
    }
);

// catgeorySchema.pre("find", async function () {
//     await this.populate({
//         path: "products",
//         select: "-categoryId",
//     }).exec();
// });

const catgeoryModel = model("Catgeory", catgeorySchema);

export default catgeoryModel;
