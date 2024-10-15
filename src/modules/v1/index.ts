import { Router } from "express";
import categoryRouter from "./category/category.route";
import productRouter from "./product/product.route";
import orderRouter from "./orders/order.route";


const v1Router = Router();

/**
 * @swagger
 * tags: 
 *   name: Category
 *   description: The Category managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *           example: 1
 *         categoryName:
 *           type: string
 *           description: The name of the category
 *           example: Non-Veg
 *         description:
 *           type: string
 *           description: The description of the category
 *           example: Non-Veg
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             refs: Product
 *           description: The products of the category
 *           example: [1, 2, 3]
 *         deletedAt:
 *           type: string
 *           description: The date when the category was deleted
 *           example: "2020-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           description: The date when the category was created
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           description: The date when the category was updated
 *           example: "2020-01-01T00:00:00.000Z"
 *       required:
 *         - categoryName
 *         - products
 *       example:
 *         _id: 1
 *         categoryName: Non-Veg
 *         description: Non-Veg
 *         products: [1, 2, 3]
 *         deletedAt: "2020-01-01T00:00:00.000Z"
 *         createdAt: "2020-01-01T00:00:00.000Z"
 *         updatedAt: "2020-01-01T00:00:00.000Z"
 */


v1Router.use("/category", categoryRouter);


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
 *         description:
 *           type: string
 *           description: The description of the product
 *           example: Pizza
 *         categoryId:
 *           type: string
 *           description: The id of the category
 *           example: 1
 *           refs: Category,
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 100
 *         tax:
 *           type: number
 *           description: The tax of the product
 *           example: 10
 *         deletedAt:
 *           type: string
 *           description: The date when the product was deleted
 *           example: "2020-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           description: The date when the product was created
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           description: The date when the product was updated
 *           example: "2020-01-01T00:00:00.000Z"
 *       required:
 *         - productName
 *         - categoryId
 *         - price
 *         - tax
 *       example:
 *         _id: 1
 *         productName: Pizza
 *         description: Pizza
 *         categoryId: 1
 *         price: 100
 *         tax: 10
 *         deletedAt: "2020-01-01T00:00:00.000Z"
 *         createdAt: "2020-01-01T00:00:00.000Z"
 *         updatedAt: "2020-01-01T00:00:00.000Z"
 *  
 */

v1Router.use("/product", productRouter);

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
 *         deletedAt: "2020-01-01T00:00:00.000Z"
 *         createdAt: "2020-01-01T00:00:00.000Z"
 *         updatedAt: "2020-01-01T00:00:00.000Z"
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

v1Router.use("/order", orderRouter);


export default v1Router