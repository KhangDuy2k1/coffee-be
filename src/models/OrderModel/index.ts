import mongoose, { Schema, model } from 'mongoose';
import IOrder from './iOrder';
const orderSchema: Schema<IOrder> = new Schema<IOrder>(
     {
          quantity: {
               type: Number,
               require: true,
          },
          user_id: {
               type: mongoose.Types.ObjectId,
               ref: 'User',
          },
          coffeeItem_id: {
               type: mongoose.Types.ObjectId,
               ref: 'CoffeeItem',
          },
          total: {
               type: Number,
          },
          createAt: {
               type: Number,
               default: Date.now(),
          },
          updateAt: {
               type: Number,
               default: Date.now(),
          },
     },
     {
          timestamps: true,
     }
);
export default model('Order', orderSchema);
