"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const counterSchema = new mongoose_1.Schema({
    _id: { type: String, required: true }, // The key could be invoiceId
    seq: { type: Number, default: 0 }, // Start the sequence at 0
});
const counterModel = mongoose_1.models.Counter || (0, mongoose_1.model)('Counter', counterSchema);
exports.default = counterModel;
