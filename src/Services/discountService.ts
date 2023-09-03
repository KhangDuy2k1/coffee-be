import discountModel from '../models/discountModel';
import { IDiscount } from '../models/discountModel/IDiscount';
interface IDiscountRes {
     success: boolean;
     mes?: string;
     error?: any;
     data_discount?: IDiscount;
}
export class Discount {
     discountCoffee = async (discountDetail: {
          category_id: string;
          discountNumber: number;
     }): Promise<IDiscountRes> => {
          try {
               const discount = await discountModel.find({
                    id_categogy: discountDetail.category_id,
               });
               if (discount) {
                    return {
                         success: false,
                         mes: 'category đang được áp mã ',
                    };
               } else {
                    const newDiscount = await discountModel.create(
                         discountDetail
                    );
                    return {
                         success: true,
                         data_discount: newDiscount,
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     getAllDiscount = async () => {
          try {
               const allDiscount = await discountModel
                    .find()
                    .populate('category_id');
               return {
                    success: true,
                    allDiscount: allDiscount,
               };
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     deleteDiscount = async (id_Discount: string) => {
          try {
               const deleteDiscount = await discountModel.findByIdAndDelete(
                    id_Discount
               );
               if (!deleteDiscount) {
                    return {
                         success: false,
                         mes: 'id khong ton tai',
                    };
               } else {
                    return {
                         success: true,
                         discountDeleted: deleteDiscount,
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
}
