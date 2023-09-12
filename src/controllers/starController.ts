import { Request, Response } from 'express';
import { StarService } from '../Services/starService';
import { StatusCode } from '../common/statusCode';
const starService = new StarService();
export class StarController {
     coffeeReviews = async (req: Request, res: Response): Promise<any> => {
          const id_user: string = (req as any).user._id;
          const id_coffee: string = req.params.id;
          const stars: number = req.body.stars;
          const respone = await starService.coffeeReviews(
               id_user,
               id_coffee,
               stars
          );
          if (respone.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'đánh giá thành công',
                         coffeeReviews: respone.coffeeReviews,
                    })
               );
          } else if (!respone.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: respone.mes,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'đánh giá thất bại',
                         error: respone.error,
                    })
               );
          }
     };
}
