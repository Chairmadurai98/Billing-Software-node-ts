import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import v1Router from "./modules/v1";
import v2Router from "./modules/v2";
import swaggerJsdoc from "swagger-jsdoc";
import connection from "./_utils/connection";
import { Constants } from "./_utils/constants";
import swaggerUiExpress from "swagger-ui-express";

const { PORT } = Constants;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const v1Options = {
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
    apis: ["dist/modules/v1/index.js", "dist/modules/v1/**/*.route.js"],
};
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

const v1Specs = swaggerJsdoc(v1Options);
const v2Specs = swaggerJsdoc(v2Options);
app.use("/api/v1/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(v1Specs));
app.use("/api/v2/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(v2Specs));
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);


app.listen(PORT, async () => {
    try {
        await connection();
        console.log("Listening on port " + PORT);
    } catch (error) {
        console.log("Express server error", error);
    }
});