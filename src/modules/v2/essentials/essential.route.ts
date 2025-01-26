import { Router } from "express";
import * as essentialController  from "./essential.controller";
import asyncHandler from "../../../_utils/middlewares/ayncHandler.middleware";

const essentialRouter = Router();

/**
 * @swagger
 * paths:
 *   /api/v2/essential:
 *     get:
 *       summary: Returns the list of all the essentials
 *       tags: [Essential]
 *       responses:
 *         200: 
 *           description: The list of the essentials
 *           content:
 *             application/json:
 *                 schema:
 *                   properties:
 *                     Product:
 *                       type: array
 *                       items:
 *                         type: string
 *                         refs: Product
 *                       description: The list of the products
 *                     Category:
 *                       type: array
 *                       items:
 *                         type: string
 *                         refs: Category
 *                       description: The list of the categories
 */

essentialRouter.get("/", asyncHandler(essentialController.essentialGetAll));


export default essentialRouter