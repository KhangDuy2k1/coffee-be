import express, { Request, Response } from 'express';
import Endpoint from '../common/endpoint';
import { OrderController } from '../controllers/orderController';
import AuthMiddleware from '../middlewares/authMiddleware';
const authMiddleware = new AuthMiddleware();
const orderCtr = new OrderController();
export const orderRouter = express.Router();
orderRouter.post(
     Endpoint.ORDER_COFFEE_DIRECT,
     authMiddleware.VerifyAccount,
     orderCtr.orderCoffee
);
// orderRouter.post(
//      Endpoint.PAY_ORDER,
//      authMiddleware.VerifyAccount,
//      orderCtr.payOrder
// );
orderRouter.delete(
     Endpoint.DELETE_ORDER,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.deleteOrder
);
orderRouter.get(
     Endpoint.GET_ALL_ORDER_USER,
     authMiddleware.VerifyAccount,
     orderCtr.orders
);
orderRouter.get(
     Endpoint.TOTAL_ORDER,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.totalOrder
);

orderRouter.put(
     Endpoint.CANCLE_ORDER_DIRECT,
     authMiddleware.VerifyAccount,
     orderCtr.cancleOrder
);
orderRouter.get(
     Endpoint.TOTAL_CANCLE,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.totalCancled
);
orderRouter.put(
     Endpoint.RECEIVED_ORDER,
     authMiddleware.VerifyAccount,
     orderCtr.receivedOrder
);
orderRouter.get(
     Endpoint.GET_ALL_ORDER,
     authMiddleware.VerifyAccount,
     authMiddleware.isAdmin,
     orderCtr.getAllOrders
);
