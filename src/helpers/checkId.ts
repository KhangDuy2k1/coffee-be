import mongoose from 'mongoose';
const CheckId = (id: string) => {
     if (!mongoose.isValidObjectId(id)) {
          console.error('id không đúng định dạng');
          return null;
     }
};
export default CheckId;
