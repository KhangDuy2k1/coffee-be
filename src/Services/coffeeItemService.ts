import CoffeeItemModel from '../models/CoffeeItemModel';
import UserModel from '../models/UserModel';
class CoffeeItemService {
     createCoffee = async (body: {
          name: string;
          price: number;
          volume: number;
          image: string;
          desc: string;
          category?: string;
     }) => {
          try {
               const createCoffee = await CoffeeItemModel.create(body);
               return {
                    success: true,
                    coffeeCreaeted: createCoffee,
               };
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     updateCoffee = async (
          param: { id: string },
          body: {
               name: string;
               price: number;
               volume: number;
               stars: number;
               image: string;
               desc: string;
               category?: string;
          }
     ) => {
          try {
               const updateCoffee = await CoffeeItemModel.findByIdAndUpdate(
                    param.id,
                    body,
                    {
                         new: true,
                    }
               );
               if (updateCoffee == null) {
                    return {
                         success: false,
                         mes: 'khong tim thay coffee de cap nhat',
                         coffee: null,
                    };
               } else {
                    return {
                         success: true,
                         coffee: updateCoffee,
                    };
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     deleteCoffee = async (params: { id: string }) => {
          interface resHandleDetete {
               success: boolean;
               mes: string;
               Coffee?: any;
               error?: any;
          }
          try {
               console.log(params.id);
               const deletedCoffee = await CoffeeItemModel.findOneAndDelete({
                    _id: params.id,
               });
               console.log(deletedCoffee);
               if (deletedCoffee == null) {
                    const HandleDeleteCoffee: resHandleDetete = {
                         success: false,
                         mes: 'coffee khong ton tai de xoa',
                         Coffee: null,
                    };
                    return HandleDeleteCoffee;
               } else {
                    const HandleDeleteCoffee: resHandleDetete = {
                         success: true,
                         mes: 'xóa coffee thành công',
                         Coffee: deletedCoffee,
                    };
                    return HandleDeleteCoffee;
               }
          } catch (error: any) {
               console.error(error);
               const HandleDeleteCoffee: resHandleDetete = {
                    success: false,
                    mes: 'da xay ra loi',
                    error: error.message,
               };
               return HandleDeleteCoffee;
          }
     };
     getAllCoffee = async () => {
          try {
               const allCoffee = await CoffeeItemModel.find({}).populate(
                    'category'
               );
               return {
                    success: true,
                    allCoffee: allCoffee,
               };
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getCoffeeById = async (id: string) => {
          try {
               const CoffeeById = await CoffeeItemModel.findById(id);
               if (!CoffeeById) {
                    return {
                         success: false,
                         mes: 'không tìm thấy id',
                    };
               } else {
                    return {
                         success: true,
                         mes: 'lấy coffee thành công',
                         coffee: CoffeeById,
                    };
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     SearchCoffee = async (keyword: string) => {
          try {
               const allCoffees = await CoffeeItemModel.find({
                    name: { $regex: keyword, $options: 'i' },
               });
               if (allCoffees.length == 0) {
                    return {
                         success: false,
                         coffee: null,
                    };
               } else {
                    return {
                         success: true,
                         coffee: allCoffees,
                    };
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     likeCoffee = async (user_id: string, params: { coffee_id: string }) => {
          try {
               const User_liked = await UserModel.findById(user_id);
               if (User_liked?.likedCoffeeItem.includes(params.coffee_id)) {
                    return {
                         success: false,
                         mes: 'coffee đã được like trước đó',
                    };
               } else {
                    User_liked?.likedCoffeeItem.push(params.coffee_id);
                    const user_liked = await User_liked?.save();
                    console.log(user_liked);
                    return {
                         success: true,
                         mes: 'đã liked Coffee',
                         userLiked: user_liked,
                    };
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    mes: 'lỗi server',
                    error: error.message,
               };
          }
     };
     unlikeCoffee = async (user_id: string, params: { coffee_id: string }) => {
          try {
               const User_unlike = await UserModel.findById(user_id);
               console.log(User_unlike);
               if (!User_unlike?.likedCoffeeItem.includes(params.coffee_id)) {
                    return {
                         success: false,
                         mes: 'coffee chưa được like',
                    };
               } else {
                    const newArrayLikedCoffee =
                         User_unlike.likedCoffeeItem.filter((coffee_id) => {
                              return coffee_id.toString() !== params.coffee_id;
                         });
                    User_unlike.likedCoffeeItem.splice(
                         0,
                         User_unlike.likedCoffeeItem.length,
                         ...newArrayLikedCoffee
                    );
                    console.log(User_unlike.likedCoffeeItem);
                    await User_unlike.save();
                    return {
                         success: true,
                         mes: 'unliked thanh cong',
                         User_unlike: User_unlike,
                    };
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    mes: 'lỗi server',
                    error: error.message,
               };
          }
     };
     getCoffeeLiked = async (user_id: string) => {
          try {
               const UserDetail = await UserModel.findById(user_id);
               const arrCoffeeLiked: any = UserDetail?.likedCoffeeItem;
               if (arrCoffeeLiked) {
                    const listCoffeeLike = await CoffeeItemModel.find({
                         _id: { $in: arrCoffeeLiked },
                    }).populate('category');
                    if (listCoffeeLike.length == 0) {
                         return {
                              success: false,
                              mes: 'người dùng chưa like coffee nào',
                         };
                    } else {
                         return {
                              success: true,
                              mes: 'lấy coffee đã like thành công',
                              listCoffeeLike: listCoffeeLike,
                         };
                    }
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    mes: 'lỗi server',
                    error: error.message,
               };
          }
     };
}
export default CoffeeItemService;
