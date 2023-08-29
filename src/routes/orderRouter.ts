import express, { Request, Response } from 'express';
import Endpoint from '../common/endpoint';
import { OrderController } from '../controllers/orderController';
const orderCtr = new OrderController();
export const orderRouter = express.Router();
orderRouter.post(Endpoint.ORDER_COFFEE, orderCtr.orderCoffee);
