"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const counter_model_1 = __importDefault(require("./counter.model"));
const orderSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId
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
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.orderId) {
            try {
                const counter = yield counter_model_1.default.findByIdAndUpdate({ _id: 'orderId' }, { $inc: { seq: 1 } }, // Increment the sequence
                { new: true, upsert: true } // Create the counter if not found
                );
                this.orderId = counter.seq; // Format the invoice ID
                next();
            }
            catch (error) {
                next(error);
            }
        }
        else {
            next();
        }
    });
});
const orderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = orderModel;
