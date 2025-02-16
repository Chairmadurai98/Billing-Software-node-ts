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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getSingleOrder = exports.getAllOrder = void 0;
const helpers_1 = require("../../../_utils/helpers");
const order_model_1 = __importDefault(require("./order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { aggregateFilter } from "./_utils";
const { Decimal128 } = mongoose_1.default.Types;
const getAllOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await orderModel.aggregate([{
        //     $match: {
        //         deletedAt: null
        //     }
        // }, ...aggregateFilter])
        //     .sort({
        //         createdAt: -1
        //     }).exec();
        const data = yield order_model_1.default.find().populate('products.productId').sort({
            createdAt: -1
        });
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.getAllOrder = getAllOrder;
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const [data] = await orderModel.aggregate([{
        //     $match: {
        //         deletedAt: null,
        //         _id: new mongoose.Types.ObjectId(req.params.id)
        //     }
        // }, ...aggregateFilter, {
        //     $limit: 1
        // }]).exec();
        const data = yield order_model_1.default.findById(req.params.id).populate('products.productId');
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        console.log(error, "error");
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.getSingleOrder = getSingleOrder;
// const INVOICE_CONSTANTS = "INVOICE"
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const lastOrder = await orderModel.find().sort({ createdAt: -1 }).limit(1);
        // let lastInvoiceId = lastOrder?.[0]?.invoiceId || '';
        const products = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.products) || [];
        const body = {
            products: products.map(product => {
                return Object.assign(Object.assign({}, product), { subTotal: Decimal128.fromString(product.subTotal || '0') });
            }),
            customerName: req.body.customerName || '',
            customerAddress: req.body.customerAddress || '',
            total: Decimal128.fromString(req.body.total || '0') || 0
        };
        const order = new order_model_1.default(body);
        const data = yield order.save();
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        console.log(error, "error");
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order_model_1.default.findByIdAndUpdate(req.params._id, req.body);
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order_model_1.default.findByIdAndDelete(req.params._id);
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.deleteOrder = deleteOrder;
