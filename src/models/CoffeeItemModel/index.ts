import mongoose, { Schema, model } from 'mongoose';
import ICoffeeItem from './coffeeItem';
const CoffeeItemSchema: Schema<ICoffeeItem> = new Schema<ICoffeeItem>(
     {
          name: {
               type: String,
               required: true,
          },
          price: {
               type: Number,
               required: true,
          },
          volume: {
               type: Number,
               required: true,
          },
          stars: {
               type: Number,
               required: true,
          },
          image: {
               type: String,
               required: true,
          },
          desc: {
               type: String,
          },
          category: {
               type: mongoose.Types.ObjectId,
               ref: 'Category',
          },
     },
     {
          timestamps: true,
     }
);
export default mongoose.model('CoffeeItem', CoffeeItemSchema);
