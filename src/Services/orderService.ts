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
     orders = async (id_user: string) => {
          console.log(id_user);
          try {
               const allOrder = await OrderModel.find({
                    user_id: id_user,
               }).populate('coffeeItem_id');
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
          } catch (error) {
               return {
                    success: false,
                    error: error,
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
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
}
