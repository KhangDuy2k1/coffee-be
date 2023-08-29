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
          try {
               const orderCoffee = new OrderModel({
                    user_id: user_id,
                    coffeeItem_id: orderDetail.coffeeitem_id,
                    quantity: orderDetail.quantity,
                    total: orderDetail.total,
               });
               await orderCoffee.save();
               return {
                    success: true,
                    order: orderCoffee,
               };
          } catch (error) {
               return {
                    success: false,
                    error: error,
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
               const orderDeleted = await OrderModel.findByIdAndDelete(
                    order_id
               );
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
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
}
