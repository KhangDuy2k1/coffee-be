import mongoose from "mongoose";
import { MongoClient } from "mongodb";
const connectDb = async () => {
     let url = process.env.URL_DB;
     try {
          mongoose.set('strictQuery', false);
          if(typeof(url) === "string"){
               await mongoose.connect(url);
               console.log('connect db thanh cong');
          }else {
               console.log("đường dẫn không đúng");
          }
     } catch (error) {
          console.error('Error connecting to MongoDB alias:', error);
     }
};
export default connectDb;
