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
exports.findProductByAggregate = exports.findProductById = exports.findProductList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("./product.model"));
const findProductList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.find({
            deletedAt: null
        }).exec();
        if (!product) {
            throw "Product not found";
        }
        return product;
    }
    catch (error) {
        throw error;
    }
});
exports.findProductList = findProductList;
const findProductById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = product_model_1.default.findOne({
            _id,
            deletedAt: null
        }).exec();
        if (!product) {
            throw "Product not found";
        }
        return product;
    }
    catch (error) {
        throw error;
    }
});
exports.findProductById = findProductById;
const findProductByAggregate = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_model_1.default
            .aggregate([{
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(_id),
                    deleteAt: null
                }
            }])
            .exec();
        if (!data) {
            throw "Product not found";
        }
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.findProductByAggregate = findProductByAggregate;
