import mongoose from 'mongoose';
import { IStar } from './iStar';
const starSchema = new mongoose.Schema<IStar>(
     {
          id_user: {
               type: String,
               ref: 'User',
               required: true,
          },
          id_coffee: {
               type: String,
               ref: 'CoffeeItem',
               required: true,
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
