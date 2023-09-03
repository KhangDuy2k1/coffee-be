const mongoose = require('mongoose');
// const URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const url =
     'mongodb+srv://khangduy123:khang123@coffee.hd94kae.mongodb.net/?retryWrites=true&w=majority';
const connectDb = async () => {
     try {
          mongoose.set('strictQuery', false);
          await mongoose.connect(url);
          console.log('connect db thanh cong');
     } catch (error) {
          console.error('Error connecting to MongoDB alias:', error);
     }
};
export default connectDb;
