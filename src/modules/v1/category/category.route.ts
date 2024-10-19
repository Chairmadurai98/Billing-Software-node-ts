import { Router } from "express";
import * as categoryController from "./category.controller";
import asyncHandler from "../../../_utils/middlewares/ayncHandler.middleware";

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 *
 */
const categoryRouter = Router();


/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRouter.get("/", asyncHandler(categoryController.getAllCategory));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
categoryRouter.get("/:_id", asyncHandler(categoryController.getSingleCategory));

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

categoryRouter.post("/", asyncHandler(categoryController.createCategory));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Update the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

categoryRouter.put("/:_id", asyncHandler(categoryController.updateCategory));

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

categoryRouter.delete("/:_id", asyncHandler(categoryController.deleteCategory));

export default categoryRouter;
