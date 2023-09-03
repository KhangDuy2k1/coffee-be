import mongoose, { Schema } from 'mongoose';
import ICategory from './iCategory';

const CategorySchema: Schema<ICategory> = new Schema<ICategory>({
     title: { 
          type: String,
          required: true,
     },
});
export default mongoose.model<ICategory>('Category', CategorySchema);
