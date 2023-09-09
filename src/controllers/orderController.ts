import { OrderService } from '../Services/orderService';
import { Request, Response } from 'express';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkIdHelper';
const orderService = new OrderService();
interface OrderDetail {
     coffeeitem_id: string;
     quantity: number;
     total: number;
}
export class OrderController {
     orderCoffee = async (req: Request, res: Response): Promise<any> => {
          const orderDetail: OrderDetail = req.body;
          const user_id: string = (req as any).user._id;
          const respone = await orderService.orderCoffee(user_id, orderDetail);
          if (respone.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'order cofee thành công',
                         order: respone.order,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         mes: 'xảy ra lỗi',
                         error: respone.error,
                    })
               );
          }
     };
     deleteOrder = async (req: Request, res: Response): Promise<any> => {
          const order_id: string = req.params.id;
          CheckId(order_id);
          const response = await orderService.deleteOrder(order_id);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: false,
                         mes: 'xóa đơn thành công',
                         orderDeleted: response.ordeDeleted,
                    })
               );
          } else if (!response.error) {
               res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'không tìm thấy id',
                    });
          } else {
               res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lỗi server',
                    });
          }
     };
     orders = async (req: Request, res: Response): Promise<any> => {
          const id_user: string = (req as any).user._id;
          const response = await orderService.orders(id_user);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'lấy orders thành công',
                         orders: response,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'chưa thanh toán đơn hàng nào',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lỗi server',
                    })
               );
          }
     };
}
