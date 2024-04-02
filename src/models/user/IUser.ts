import mongoose, { Document } from 'mongoose';
interface IUser extends Document {
     email: string;
     password: string;
     phonenumber: string;
     role: string;
     likedCoffeeItem: mongoose.Types.ObjectId[];
     avatar: string;
     reftoken: String;
}
export default IUser;
