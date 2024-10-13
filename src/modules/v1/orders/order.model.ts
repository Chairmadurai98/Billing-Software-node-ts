import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    deletedAt : {
        type : Date,
        default : null
    },
    products : [{
        productId : [{
            ref : "Product",
            type : Schema.Types.ObjectId
        }],
        price : Number,
        totalPrice : Number,
        quantity : Number,
    }]
}, {
    timestamps: true
});

const orderModel =  model('Order', orderSchema);

export default orderModel;