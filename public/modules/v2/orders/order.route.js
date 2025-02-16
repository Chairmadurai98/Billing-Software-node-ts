"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController = __importStar(require("./order.controller"));
const ayncHandler_middleware_1 = __importDefault(require("../../../_utils/middlewares/ayncHandler.middleware"));
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */
const orderRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v2/order:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for filtering orders (ISO format, e.g. "2025-01-01").
 *       - in: query
 *         name: to
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for filtering orders (ISO format, e.g. "2025-01-20").
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
orderRouter.get("/", (0, ayncHandler_middleware_1.default)(orderController.getAllOrder));
/**
 * @swagger
 * /api/v2/order/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *
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
orderRouter.get("/:id", (0, ayncHandler_middleware_1.default)(orderController.getSingleOrder));
/**
 * @swagger
 * /api/v2/order:
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
orderRouter.post("/", (0, ayncHandler_middleware_1.default)(orderController.createOrder));
/**
 * @swagger
 * /api/v2/order/{id}:
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
orderRouter.put("/:id", (0, ayncHandler_middleware_1.default)(orderController.updateOrder));
/**
 * @swagger
 * /api/v2/order/{id}:
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
orderRouter.delete("/:id", (0, ayncHandler_middleware_1.default)(orderController.deleteOrder));
exports.default = orderRouter;
