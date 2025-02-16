"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }, toObject: {
        virtuals: true
    }
});
productSchema.virtual('label').get(function () {
    const label = this.tamilName;
    return label;
});
productSchema.virtual('value').get(function () {
    const value = this._id;
    return value;
});
const productModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = productModel;
