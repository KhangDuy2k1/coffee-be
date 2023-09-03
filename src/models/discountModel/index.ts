import mongoose, { Schema } from 'mongoose';
import { IDiscount } from './IDiscount';

const discountSchema: Schema<IDiscount> = new Schema<IDiscount>({
     discount: Number,
     categorydiscount: [
          {
               type: mongoose.Types.ObjectId,
               ref: 'Category',
          },
     ],
});
export default mongoose.model('Discount', discountSchema);
