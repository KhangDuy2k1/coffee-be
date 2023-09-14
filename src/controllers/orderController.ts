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
     totalOrder = async (req: Request, res: Response): Promise<any> => {
          const respone = await orderService.getTotalOrder();
          if (respone.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'lấy tổng số đơn hàng thành công',
                         total: respone.total,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         mes: 'lỗi server',
                         error: respone.error,
                    })
               );
          }
     };
     // payOrder = async (req: Request, res: Response) => {
     //      const id_user = (req as any).user._id;
     //      const payOderDetail: {
     //           coffeeitem_id: string;
     //           quantity: number;
     //           total: number;
     //      } = req.body;
     //      const response = await orderService.payOrder(id_user, payOderDetail);
     //      if (response.success) {
     //           return (
     //                res.status(StatusCode.OK),
     //                res.json({
     //                     success: true,
     //                     mes: 'thanh toán thành công',
     //                     orderPaid: response.orderPaid,
     //                })
     //           );
     //      } else {
     //           return (
     //                res.status(StatusCode.SERVER_ERROR),
     //                res.json({
     //                     success: false,
     //                     mes: 'lỗi server',
     //                     error: response.error,
     //                })
     //           );
     //      }
     // };
     cancleOrder = async (req: Request, res: Response): Promise<any> => {
          const id_order: string = req.params.id;
          const response = await orderService.cancleOrder(id_order);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'hủy thành công',
                         orderCancled: response.orderCancled,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'không tìm thấy id',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'xảy ra lỗi',
                         error: response.error,
                    })
               );
          }
     };
     totalCancled = async (req: Request, res: Response) => {
          const response = await orderService.totalCancled();
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'lấy tổng số đơn hàng đã hủy thành công',
                         total: response.totalCancled,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'có lỗi',
                         error: response.error,
                    })
               );
          }
     };
     receivedOrder = async (req: Request, res: Response): Promise<any> => {
          const id_order: string = req.params.id;
          const response = await orderService.receivedOrder(id_order);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'nhận hàng thành công',
                         orderReceived: response.orderReceived,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'không tìm thấy id',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'có lỗi xảy ra',
                         error: response.error,
                    })
               );
          }
     };
     getAllOrders = async (req: Request, res: Response) => {
          const response = await orderService.getAllOrder();
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'lấy tất cả đơn hàng thành công',
                         allOrder: response.allOrder,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lấy thất bại',
                         error: response.error,
                    })
               );
          }
     };
}
