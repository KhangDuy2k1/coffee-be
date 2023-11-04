import CoffeeItemModel from '../models/CoffeeItemModel';
import StarModel from '../models/StarModel';
export class StarService {
     coffeeReviews = async (
          id_user: string,
          id_coffee: string,
          stars: number
     ) => {
          try {
               await StarModel.create({
                    id_user: id_user,
                    id_coffee: id_coffee,
                    stars: stars,
               });
               const totalReviews = await StarModel.countDocuments({
                    id_coffee: id_coffee,
               });
               const listStars = await StarModel.find({
                    id_coffee: id_coffee,
               });
               let totalStars = 0;
               for (let item of listStars) {
                    totalStars += item.stars;
               }
               const responseCoffee = await CoffeeItemModel.findByIdAndUpdate(
                    id_coffee,
                    {
                         stars: totalStars / totalReviews,
                    },
                    {
                         new: true,
                    }
               );
               return {
                    success: true,
                    mes: 'đánh giá thành công',
                    coffeeReviews: responseCoffee,
               };
          } catch (error: any) {
               return {
                    success: false,
                    mes: 'đánh giá thất bại',
                    error: error.message,
               };
          }
     };
}
