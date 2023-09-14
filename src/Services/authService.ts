import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import GenarateToken from '../helpers/tokenHelper';
import { ResAuth, ResDataToken } from '../helpers/interfacesHelper';
import IUser from '../models/UserModel/IUser';
class AuthService {
     register = async (body: {
          email: string;
          password: string;
          phonenumber: string;
     }): Promise<ResAuth> => {
          try {
               const checkEmail: IUser | null = await UserModel.findOne({
                    email: body.email,
               });
               if (checkEmail) {
                    return {
                         success: false,
                         user: null,
                    };
               }
               const hashPassword: string = await bcrypt.hash(
                    body.password,
                    10
               );
               const createUser: IUser = await UserModel.create({
                    email: body.email,
                    password: hashPassword,
                    phonenumber: body.phonenumber,
               });
               return {
                    success: true,
                    user: createUser,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     login = async (body: {
          email: string;
          password: string;
     }): Promise<ResAuth> => {
          try {
               const userLogined: IUser | null = await UserModel.findOne({
                    email: body.email,
               });
               if (userLogined == null) {
                    return {
                         success: false,
                         user: null,
                    };
               } else {
                    const comparePassword = await bcrypt.compare(
                         body.password,
                         userLogined.password
                    );
                    if (comparePassword) {
                         const Tokens: GenarateToken = new GenarateToken(
                              userLogined.id
                         );
                         const accessToken: string = Tokens.accessToken();
                         const refreshToken: string = Tokens.refreshToken();
                         if (userLogined.reftoken === '') {
                              userLogined.reftoken = refreshToken;
                              await userLogined.save();
                         } else {
                              userLogined.reftoken = '';
                              userLogined.reftoken = refreshToken;
                              await userLogined.save();
                         }
                         return {
                              success: true,
                              user: userLogined,
                              accessToken: accessToken,
                              refreshToken: refreshToken,
                         };
                    } else {
                         return {
                              success: false,
                         };
                    }
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     refresh = async (body: { refreshToken: string }): Promise<ResAuth> => {
          try {
               const user: IUser | null = await UserModel.findOne({
                    reftoken: [body.refreshToken],
               });
               if (!user) {
                    return {
                         success: false,
                         mes: 'Token bị gỡ bỏ',
                         user: null,
                    };
               } else {
                    const payload: any = new GenarateToken().verifyRefreshToken(
                         body.refreshToken
                    );
                    if (new Date() > new Date(payload.exp * 1000)) {
                         return {
                              success: false,
                              mes: 'token đã hết hạn',
                         };
                    } else {
                         const accessToken = new GenarateToken(
                              user.id
                         ).accessToken();
                         return {
                              success: true,
                              accessToken: accessToken,
                         };
                    }
               }
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    mes: 'xảy ra lỗi',
                    error: error.message,
               };
          }
     };
     getalluser = async (): Promise<ResAuth> => {
          try {
               const allUser: IUser[] = await UserModel.find({});
               return {
                    success: true,
                    allUser: allUser,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     updateUser = async (
          id: string,
          user_update: {
               email: string;
               phonenumber: string;
               role: string;
          }
     ) => {
          try {
               const userUpdated = await UserModel.findByIdAndUpdate(
                    id,
                    {
                         email: user_update.email,
                         phonenumber: user_update.phonenumber,
                         role: user_update.role,
                    },
                    {
                         new: true,
                    }
               );
               if (!userUpdated) {
                    return {
                         success: false,
                         mes: 'không tìm thấy user',
                    };
               } else {
                    return {
                         success: true,
                         userUpdated: userUpdated,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     deleteUser = async (id: string): Promise<ResAuth> => {
          try {
               const userDeleted: IUser | null =
                    await UserModel.findOneAndDelete({
                         _id: id,
                    });
               return {
                    success: true,
                    user: userDeleted,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getUserLogin = async (id_user: string) => {
          try {
               const response = await UserModel.findById(id_user);
               if (!response) {
                    return {
                         success: false,
                         mes: 'không tìm thấy user',
                    };
               } else {
                    return {
                         success: true,
                         mes: 'lấy thông tin người dùng đang đăng nhập thành công',
                         user: response,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    mes: 'lỗi server',
                    error: error.message,
               };
          }
     };
     getUserById = async (id: string) => {
          try {
               const user = await UserModel.findById(id);
               if (!user) {
                    return {
                         success: false,
                         mes: 'khong tim thay user',
                    };
               } else {
                    return {
                         success: true,
                         user: user,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getTotalUser = async () => {
          try {
               const totalUser = await UserModel.countDocuments({});
               return {
                    success: true,
                    totalUser: totalUser,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
}
export default AuthService;
