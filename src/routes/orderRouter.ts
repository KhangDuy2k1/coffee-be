import express, { Request, Response } from 'express';
import Endpoint from '../common/endpoint';
import { OrderController } from '../controllers/orderController';
import AuthMiddleware from '../middlewares/authMiddleware';
const authMiddleware = new AuthMiddleware();
const orderCtr = new OrderController();
export const orderRouter = express.Router();
orderRouter.post(
     Endpoint.ORDER_COFFEE,
     authMiddleware.VerifyAccount,
     orderCtr.orderCoffee
);
orderRouter.delete(
     Endpoint.DELETE_ORDER,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.deleteOrder
);
orderRouter.get(
     Endpoint.GET_ALL_ORDER,
     authMiddleware.VerifyAccount,
     orderCtr.orders
);
orderRouter.get(
     Endpoint.TOTAL_ORDER,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.totalOrder
);
