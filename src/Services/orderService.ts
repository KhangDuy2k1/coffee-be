import IOrder from '../models/OrderModel/iOrder';
import OrderModel from '../models/OrderModel';
export class OrderService {
     orderCoffee = async (
          user_id: string,
          orderDetail: {
               coffeeitem_id: string;
               quantity: number;
               total: number;
          }
     ): Promise<{
          success: boolean;
          order?: IOrder;
          error?: any;
     }> => {
          console.log(user_id);
          try {
               const orderCoffee = await OrderModel.create({
                    user_id: user_id,
                    coffeeItem_id: orderDetail.coffeeitem_id,
                    quantity: orderDetail.quantity,
                    total: orderDetail.total,
               });
               return {
                    success: true,
                    order: orderCoffee,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     deleteOrder = async (
          order_id: string
     ): Promise<{
          success: boolean;
          mes?: string;
          error?: any;
          ordeDeleted?: IOrder;
     }> => {
          try {
               const orderDeleted =
                    await OrderModel.findByIdAndDelete(order_id);
               if (!orderDeleted) {
                    return {
                         success: false,
                    };
               } else {
                    return {
                         success: true,
                         ordeDeleted: orderDeleted,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     orders = async (id_user: string) => {
          console.log(id_user);
          try {
               const allOrder = await OrderModel.find({
                    user_id: id_user,
               })
                    .populate('coffeeItem_id')
                    .populate('user_id');
               console.log(allOrder);
               if (allOrder.length === 0) {
                    return {
                         success: false,
                    };
               } else {
                    return {
                         success: true,
                         order: allOrder,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getTotalOrder = async () => {
          try {
               const total = await OrderModel.countDocuments({});
               return {
                    success: true,
                    total: total,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     // payOrder = async (
     //      id_user: string,
     //      orderDetail: {
     //           coffeeitem_id: string;
     //           quantity: number;
     //           total: number;
     //      }
     // ) => {
     //      try {
     //           const response = await OrderModel.create({
     //                user_id: id_user,
     //                coffeeItem_id: orderDetail.coffeeitem_id,
     //                quantity: orderDetail.quantity,
     //                status: 'đã thanh toán',
     //                total: orderDetail.total,
     //           });
     //           return {
     //                success: true,
     //                orderPaid: response,
     //           };
     //      } catch (error: any) {
     //           return {
     //                success: false,
     //                error: error.message,
     //           };
     //      }
     // };
     cancleOrder = async (id_order: string) => {
          try {
               const response = await OrderModel.findByIdAndUpdate(
                    id_order,
                    {
                         status: 'đã hủy',
                    },
                    {
                         new: true,
                    }
               );
               if (!response) {
                    return {
                         success: false,
                         mes: 'không tìm thấy id',
                    };
               } else {
                    return {
                         success: true,
                         orderCancled: response,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     totalCancled = async () => {
          try {
               const response = await OrderModel.countDocuments({
                    status: 'đã hủy',
               });
               return {
                    success: true,
                    totalCancled: response,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     receivedOrder = async (id_order: string) => {
          try {
               const response = await OrderModel.findByIdAndUpdate(
                    id_order,
                    {
                         status: 'giao hàng thành công',
                    },
                    {
                         new: true,
                    }
               );
               if (!response) {
                    return {
                         success: false,
                         mes: ' không tìm thấy id',
                    };
               } else {
                    return {
                         success: true,
                         orderReceived: response,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getAllOrder = async () => {
          try {
               const respone = await OrderModel.find()
                    .populate('user_id')
                    .populate('coffeeItem_id');
               return {
                    success: true,
                    allOrder: respone,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
}
