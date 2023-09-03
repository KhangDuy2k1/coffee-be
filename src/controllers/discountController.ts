import { Discount } from '../Services/discountService';
import express, { Request, Response, response } from 'express';
import { StatusCode } from '../common/statusCode';
export const discountRouter = express.Router();
const discount = new Discount();
export class DiscountCtr {
     discount = async (req: Request, res: Response): Promise<any> => {
          const discountDetail: {
               category_id: string;
               discountNumber: number;
          } = req.body;
          const response = await discount.discountCoffee(discountDetail);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'thanh cong',
                         discount: response.data_discount,
                    })
               );
          } else if (response.error) {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         mes: 'co loi xay ra',
                         error: response.error,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'dang duoc ap ma',
                    })
               );
          }
     };
     allDiscount = async (req: Request, res: Response) => {
          const response = await discount.getAllDiscount();
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'lay discount thanh cong',
                         discounts: response.allDiscount,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lay discount that bai',
                    })
               );
          }
     };
     deleteDiscount = async (req: Request, res: Response) => {
          const id_discount = req.params.id;

          const response = await discount.deleteDiscount(id_discount);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'xoa thanh cong',
                         discountDeleted: response.discountDeleted,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'khong tim thay discount',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         mes: 'loi server',
                         error: response.error,
                    })
               );
          }
     };
}
