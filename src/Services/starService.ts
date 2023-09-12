import StarModel from '../models/StarModel';

export class StarService {
     coffeeReviews = async (
          id_user: string,
          id_coffee: string,
          stars: number
     ) => {
          try {
               const response = await StarModel.create({
                    id_user: id_user,
                    id_coffee: id_coffee,
                    stars: stars,
               });
               return {
                    success: true,
                    mes: 'đánh giá thành công',
                    coffeeReviews: response,
               };
          } catch (error) {
               return {
                    success: false,
                    mes: 'đánh giá thất bại',
                    error: error,
               };
          }
     };
     starsMediumById = async (id_coffee: string) => {
          //   console.log(id_coffee);
          try {
               const totalReviews = await StarModel.countDocuments({
                    id_coffee: id_coffee,
               });
               console.log(totalReviews);
               if (totalReviews === 0) {
                    return {
                         success: false,
                         mes: 'sản phẩm chưa có ai đánh giá',
                    };
               } else {
                    const listStars = await StarModel.find({
                         id_coffee: id_coffee,
                    });
                    let totalStars = 0;
                    for (let item of listStars) {
                         totalStars += item.stars;
                    }

                    return {
                         success: true,
                         mes: 'lấy đánh giá thành công',
                         startMedium: totalStars / totalReviews,
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    mes: 'có lỗi xảy ra',
                    error: error,
               };
          }
     };
}
