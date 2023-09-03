import { Discount } from '../Services/discountService';
import express, { Request, Response } from 'express';
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
}
