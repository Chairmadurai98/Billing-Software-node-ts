import { Router } from "express";
import productRouter from "./product/product.route";
import orderRouter from "./orders/order.route";
import essentialRouter from "./essentials/essential.route";


const v2Router = Router();
/**
 * @swagger
 * tags: 
 *   name: Essential
 *   description: The Essential managing API
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Essential:
 *       type: object
 *       properties:
 *         Product:
 *           type: array
 *           items:
 *             type: string
 *             refs: Product
 *           description: The list of the products
 */

v2Router.use("/essential", essentialRouter);



/**
 * @swagger
 * tags: 
 *   name: Product
 *   description: The Product managing API
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *           example: 1
 *         productName:
 *           type: string
 *           description: The name of the product
 *           example: Pizza
 *         tamilName:
 *           type: string
 *           description: The tamil name of the product
 *           example: Pizza
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: Pizza
 *         deletedAt:
 *           type: string
 *           description: The date when the product was deleted
 *           example: "2020-01-01T00:00:00.000Z"
 *       required:
 *         - productName
 *         - tamilName
 *       example:
 *         _id: 1
 *         productName: Pizza
 *         tamilName: Pizza
 *         description: Pizza
 *   
 */

v2Router.use("/product", productRouter);

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the order
 *           example: 1
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             refs: Product
 *           description: The products of the order
 *           example: [1, 2, 3]
 *         deletedAt:
 *           type: string
 *           description: The date when the order was deleted
 *           example: "2020-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           description: The date when the order was created
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           description: The date when the order was updated
 *           example: "2020-01-01T00:00:00.000Z"
 *       required:
 *         - products
 *       example:
 *         _id: 1
 *         products: [1, 2, 3]
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     OrderProduct:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           format: uuid
 *           example: "60d5ec49f0d1f73f4c90c5f1"  # Example ObjectId
 *         price:
 *           type: number
 *           format: float
 *           example: 100
 *         totalPrice:
 *           type: number
 *           format: float
 *           example: 200
 *         quantity:
 *           type: integer
 *           example: 2
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           example: "ORD123456"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2020-01-01T00:00:00.000Z"
 *         totalAmount:
 *           type: number
 *           format: float
 *           example: 300
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderProduct'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2020-01-01T00:00:00.000Z"
 * 
 */

v2Router.use("/order", orderRouter);


export default v2Router