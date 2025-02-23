import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import v2Router from "./modules/v2";
import swaggerJsdoc from "swagger-jsdoc";
import connection from "./_utils/connection";
import { Constants } from "./_utils/constants";
import swaggerUiExpress from "swagger-ui-express";

const { PORT, DOMAIN } = Constants;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

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
                url: DOMAIN,
            },
        ],
    },
    apis: ["public/modules/v2/index.js", "public/modules/v2/**/*.route.js"],
};

const v2Specs = swaggerJsdoc(v2Options);
app.use("/api/v2/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(v2Specs));
app.use("/api/v2", v2Router);
app.use("/", (_, res) => {
    res.redirect("/api/v2/api-docs");
});


app.listen(PORT, async () => {
    try {
        await connection();
        console.log("Listening on port " + PORT);
    } catch (error) {
        console.log("Express server error", error);
    }
});