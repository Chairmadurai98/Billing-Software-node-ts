import { Router } from "express";
import * as productController from "./product.controller";
import asyncHandler from "../../../_utils/middlewares/ayncHandler.middleware";

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The Product managing API
 *
 */
const productRouter = Router();

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *
 */
productRouter.get("/", asyncHandler(productController.getAllProduct));

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */


productRouter.get("/:_id", asyncHandler(productController.getSingleProduct));


/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 */

productRouter.post("/", asyncHandler(productController.createProduct));


/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Update the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * 
 */

productRouter.put("/:_id", asyncHandler(productController.updateProduct));


/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

productRouter.delete("/:_id", asyncHandler(productController.deleteProduct));

export default productRouter;