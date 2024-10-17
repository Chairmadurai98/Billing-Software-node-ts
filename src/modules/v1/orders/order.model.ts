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
    totalAmount : {
        type : Number,
        default : 0
    },
    subTotal : {
        type : Number,
        default : 0
    },
    paymentMethod : {
        type : String,
        default : "Cash",
        enum : ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment']
    },
    discount : { 
        type : Number,
        default : 0
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