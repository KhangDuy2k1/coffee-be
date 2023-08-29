import mongoose, { Schema } from 'mongoose';
import { IDiscount } from './IDiscount';

const discountSchema: Schema<IDiscount> = new Schema<IDiscount>({
     discount: Number,
     categogyDiscount: [
          {
               type: mongoose.Types.ObjectId,
          },
     ],
});
export default mongoose.model('Discount', discountSchema);
