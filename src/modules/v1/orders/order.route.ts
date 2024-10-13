import { Router } from "express";
import * as orderController from "./order.controller";

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */

const orderRouter = Router();

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

orderRouter.get("/", orderController.getAllOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 * 
 */

orderRouter.get("/:id", orderController.getSingleOrder);

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 * 
 */

orderRouter.post("/", orderController.createOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   put:
 *     summary: Update the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order' 
 */ 
orderRouter.put("/:id", orderController.updateOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   delete:
 *     summary: Remove the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 * 
 */

orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter;
