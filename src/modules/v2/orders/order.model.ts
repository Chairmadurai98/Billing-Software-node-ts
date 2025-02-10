import { model, Schema, Document, Model, Decimal128 } from "mongoose";
import counterModel from "./counter.model";

type OrderProductType = {
    productId: ProductType,
    price: number,
    subTotal: Decimal128,
    quantity: number,
    label : string,
    units: 'kgs' | 'kg' | 'pc' | 'pcs'
}

export type IOrder = {
    orderId: string
    customerName: string
    customerAddress: string
    deletedAt?: Date | null,
    total: Decimal128,
    products: OrderProductType[],
    createdAt: Date,
    updatedAt: Date
}

export type OrderType = IOrder & Document

const orderSchema = new Schema<IOrder>({
    orderId: {
        unique: true,
        // required : true,
        type: String,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    total: {
        type: Number,
        default: 0
    },
    customerName: String,
    customerAddress: String,
    products: [{
        productId: {
            ref: "Product",
            type: Schema.Types.ObjectId
        },
        price: Number,
        subTotal: Number,
        quantity: Number,
        units: {
            type: String,
            // enum: ['kgs', 'kg', 'pc', 'pcs', '']
        }
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


orderSchema.pre('save', async function (this: IOrder, next) {
    if (!this.orderId) {
        try {
            const counter = await counterModel.findByIdAndUpdate(
                { _id: 'orderId' },
                { $inc: { seq: 1 } },  // Increment the sequence
                { new: true, upsert: true }  // Create the counter if not found
            );
            this.orderId = counter.seq;  // Format the invoice ID
            next();
        } catch (error) {
            next(error as Error);
        }
    } else {
        next();
    }
});


const orderModel: Model<IOrder> = model<IOrder>('Order', orderSchema)

export default orderModel;