import { model, Schema, Document, Model } from "mongoose";

export type IOrder = {
    orderId: string
    customerName: string
    customerAddress: string
    deletedAt?: Date | null,
    totalAmount: number
    subTotal: number
    paymentMethod: string
    discount: number
    products: {
        productId: string
        price: number
        totalPrice: number
        quantity: number,
    }[],
    createdAt: Date,
    updatedAt: Date
}

export type OrderType = IOrder & Document

const orderSchema = new Schema<IOrder>({
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
    customerName : String,
    customerAddress : String,
    products : [{
        productId : {
            ref : "Product",
            type : Schema.Types.ObjectId
        },
        price : Number,
        totalPrice : Number,
        quantity : Number,
    }]
}, {
    timestamps: true,
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
});


orderSchema.virtual('orderId').get(function(this: OrderType) {
    const orderId = "INVOICE-" + this.createdAt.getTime();  
    return orderId;
});
const orderModel : Model<IOrder> = model<IOrder>('Order', orderSchema)

export default orderModel;