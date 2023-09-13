import mongoose from 'mongoose';
import { IStar } from './iStar';
const starSchema = new mongoose.Schema<IStar>(
     {
          id_user: {
               type: mongoose.Types.ObjectId,
               ref: 'User',
          },
          id_coffee: {
               type: mongoose.Types.ObjectId,
               ref: 'CoffeeItem',
          },
          stars: {
               type: Number,
               default: 0,
          },
     },
     {
          timestamps: true,
     }
);
export default mongoose.model('Star', starSchema);
