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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getSingleProduct = exports.getAllProduct = void 0;
const helpers_1 = require("../../../_utils/helpers");
const product_model_1 = __importDefault(require("./product.model"));
const _utils_1 = require("./_utils");
const getAllProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_model_1.default.find({
            deletedAt: null
        }).exec();
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.getAllProduct = getAllProduct;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        //Not found throws error
        const data = yield (0, _utils_1.findProductById)(_id);
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.getSingleProduct = getSingleProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_model_1.default.create(req.body);
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        //Not found throws error
        yield (0, _utils_1.findProductById)(_id);
        const data = yield product_model_1.default.findByIdAndUpdate(_id, req.body).exec();
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        //Not found throws error
        yield (0, _utils_1.findProductById)(_id);
        const data = yield product_model_1.default
            .findByIdAndUpdate(_id, {
            deletedAt: new Date(),
        })
            .exec();
        helpers_1.CustomResponse.success({ res, data });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.deleteProduct = deleteProduct;
