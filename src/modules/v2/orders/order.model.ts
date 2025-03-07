import { model, Schema, Document, Model , models} from "mongoose";

export type IOrder = {
    orderId: string
    invoiceId: string
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
    invoiceId : {
        unique : true,
        required : true,
        type : String,
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
    const orderId = "ORDER-" + this.createdAt.getTime();  
    return orderId;
});
const orderModel : Model<IOrder> = models.Order || model<IOrder>('Order', orderSchema)

export default orderModel;