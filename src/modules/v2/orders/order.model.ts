import { model, Schema, Document, Model } from "mongoose";
import counterModel from "./counter.model";

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
        subTotal: number
        quantity: number,
    }[],
    createdAt: Date,
    updatedAt: Date
}

export type OrderType = IOrder & Document

const orderSchema = new Schema<IOrder>({
    orderId : {
        unique : true,
        // required : true,
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
        subTotal : Number,
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


orderSchema.pre('save', async function(this: IOrder, next) {
    if (!this.orderId) {
        try {
            const counter = await counterModel.findByIdAndUpdate(
                { _id: 'orderId' }, 
                { $inc: { seq: 1 } },  // Increment the sequence
                { new: true, upsert: true }  // Create the counter if not found
            );
            this.orderId = `ORD-${counter.seq.toString().padStart(6, '0')}`;  // Format the invoice ID
            next();
        } catch (error) {
            next(error as Error);
        }
    } else {
        next();
    }
});

const orderModel : Model<IOrder> = model<IOrder>('Order', orderSchema)

export default orderModel;