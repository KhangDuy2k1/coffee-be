import mongoose from 'mongoose';
interface ICoffeeItem extends mongoose.Document {
     name: string;
     price: number;
     volume: number;
     stars: number;
     image: string;
     desc: string;
     category?: mongoose.Types.ObjectId;
}
export default ICoffeeItem;
