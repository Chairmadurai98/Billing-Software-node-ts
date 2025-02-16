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
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const v2_1 = __importDefault(require("./modules/v2"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const connection_1 = __importDefault(require("./_utils/connection"));
const constants_1 = require("./_utils/constants");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const { PORT } = constants_1.Constants;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
const v2Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Billing Software - Swagger",
            description: "Billing Software  with Swagger",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["dist/modules/v2/index.js", "dist/modules/v2/**/*.route.js"],
};
const v2Specs = (0, swagger_jsdoc_1.default)(v2Options);
app.use("/api/v2/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(v2Specs));
app.use("/api/v2", v2_1.default);
app.use("/", (_, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.default)();
        console.log("Listening on port " + PORT);
    }
    catch (error) {
        console.log("Express server error", error);
    }
}));
