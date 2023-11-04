import mongoose, { Document } from 'mongoose';
interface IOrder extends Document {
     coffeeItem_id?: mongoose.Types.ObjectId;
     user_id?: mongoose.Types.ObjectId;
     quantity: number;
     total: number;
     status: string;
     createAt: number;
     updateAt: number;
}

export default IOrder;
