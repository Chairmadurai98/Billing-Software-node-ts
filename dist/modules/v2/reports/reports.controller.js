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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = void 0;
const helpers_1 = require("../../../_utils/helpers");
const getReports = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await catgeoryModel.find();
        helpers_1.CustomResponse.success({ res, data: [] });
    }
    catch (error) {
        helpers_1.CustomResponse.error({ res, error });
    }
});
exports.getReports = getReports;
