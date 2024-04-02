import mongoose, { Schema } from 'mongoose';
import IUser from './IUser';
const UserSchema: Schema<IUser> = new Schema<IUser>(
     {
          email: {
               type: String,
               required: true,
          },
          password: {
               type: String,
               required: true,
          },
          phonenumber: {
               type: String,
               required: true,
          },
          role: {
               type: String,
               default: 'user',
          },
          likedCoffeeItem: [
               {
                    type: Schema.Types.ObjectId,
                    ref: 'CoffeeItem', 
               },
          ],
          avatar: {
               type: String,
               default: 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg',
          },
          reftoken: {
               type: String,
               default: '',
          },
     },
     {
          timestamps: true,
     }
);
export default mongoose.model<IUser>('User', UserSchema);
