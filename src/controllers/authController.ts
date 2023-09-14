import { Request, Response } from 'express';
import AuthService from '../Services/authService';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkIdHelper';
import { ResAuth } from '../helpers/interfacesHelper';
const authService = new AuthService();
class AuthCtr {
     Register = async (req: Request, res: Response): Promise<any> => {
          const body: { email: string; password: string; phonenumber: string } =
               req.body;
          const userif: ResAuth = await authService.register(body);
          if (userif.success) {
               const resCtrSuccess: ResAuth = {
                    success: true,
                    mes: 'đăng kí thành công',
                    user: userif.user,
               };
               return res.status(StatusCode.CREATED), res.json(resCtrSuccess);
          } else if (!userif.error) {
               const resCtrFail: ResAuth = {
                    success: false,
                    mes: 'email đã tồn tại',
               };
               return res.status(StatusCode.BAD_REQUEST), res.json(resCtrFail);
          } else {
               const resCtrError: ResAuth = {
                    success: false,
                    mes: 'đã xảy ra lỗi',
                    error: userif.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR), res.json(resCtrError)
               );
          }
     };
     Login = async (req: Request, res: Response): Promise<any> => {
          const body: { email: string; password: string } = req.body;
          const responseLogin: ResAuth = await authService.login(body);
          if (responseLogin?.success) {
               const resLoginSuccess: ResAuth = {
                    success: true,
                    mes: 'đăng nhập thành công',
                    accessToken: responseLogin.accessToken,
                    refreshToken: responseLogin.refreshToken,
                    user: responseLogin.user,
               };
               return res.status(StatusCode.OK), res.json(resLoginSuccess);
          } else if (!responseLogin?.error) {
               const resLoginWrongInfo: ResAuth = {
                    success: false,
                    mes: 'sai thông tin đăng nhập vui lòng đăng nhập lại',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resLoginWrongInfo)
               );
          } else {
               const resLoginError: ResAuth = {
                    success: false,
                    mes: 'có lỗi xảy ra',
                    error: responseLogin.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR), res.json(resLoginError)
               );
          }
     };
     Refresh = async (req: Request, res: Response): Promise<any> => {
          const body: { refreshToken: string } = req.body;
          const responseRefreshToken: ResAuth = await authService.refresh(body);
          if (responseRefreshToken.success) {
               const resRefreshTokenSucess: ResAuth = {
                    success: true,
                    mes: 'refreshToken thành công',
                    accessToken: responseRefreshToken.accessToken,
               };
               return (
                    res.status(StatusCode.OK), res.json(resRefreshTokenSucess)
               );
          } else if (responseRefreshToken.user == null) {
               const resTokenNotFound: ResAuth = {
                    success: false,
                    mes: 'Token bị gỡ bỏ',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resTokenNotFound)
               );
          } else if (!responseRefreshToken.error) {
               const resTokenExpired: ResAuth = {
                    success: false,
                    mes: 'Token hết hạn',
               };
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json(resTokenExpired)
               );
          } else {
               const resError: ResAuth = {
                    success: false,
                    mes: ' xảy ra lỗi',
                    error: responseRefreshToken.error,
               };
               return res.status(StatusCode.SERVER_ERROR), res.json(resError);
          }
     };
     getAllUser = async (req: Request, res: Response): Promise<any> => {
          const responseAllUser: ResAuth = await authService.getalluser();
          if (responseAllUser.success) {
               const resAllUserSuccess: ResAuth = {
                    success: true,
                    mes: 'lấy alluser thành công',
                    allUser: responseAllUser.allUser,
               };
               return res.status(StatusCode.OK), res.json(resAllUserSuccess);
          } else {
               const resAllUserError: ResAuth = {
                    success: false,
                    mes: 'xảy ra lỗi',
                    error: responseAllUser.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json(resAllUserError)
               );
          }
     };
     updateUser = async (req: Request, res: Response): Promise<any> => {
          const id = req.params.id;
          const user_update: {
               email: string;
               phonenumber: string;
               role: string;
          } = req.body;
          const response = await authService.updateUser(id, user_update);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'cập nhật người dùng thành công',
                         userUpdated: response.userUpdated,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'không tìm thấy người dùng cập nhật',
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lỗi server',
                         error: response.error,
                    })
               );
          }
     };
     deleteUser = async (
          req: Request<{ id: string }>,
          res: Response
     ): Promise<any> => {
          const param: { id: string } = req.params;
          CheckId(param.id);
          const resDeleteUser: ResAuth = await authService.deleteUser(param.id);
          if (resDeleteUser.success) {
               const resDeleteSuccess: ResAuth = {
                    success: true,
                    mes: 'xóa user thành công',
                    user: resDeleteUser.user,
               };
               return res.status(StatusCode.OK), res.json(resDeleteSuccess);
          } else {
               const resDeleteError: ResAuth = {
                    success: false,
                    mes: 'xảy ra lỗi',
                    error: resDeleteUser.error,
               };
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json(resDeleteError)
               );
          }
     };
     getUserLogin = async (req: Request, res: Response) => {
          const id_user = (req as any).user._id;
          const respone = await authService.getUserLogin(id_user);
          if (respone.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: respone.mes,
                         user: respone.user,
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
                         mes: respone.mes,
                         error: respone.error,
                    })
               );
          }
     };
     getUserById = async (req: Request, res: Response): Promise<any> => {
          const id = req.params.id;
          const response = await authService.getUserById(id);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         mes: 'lay user thanh cong ',
                         user: response.user,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'khong tim thay user',
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
     getTotalUser = async (req: Request, res: Response) => {
          const response = await authService.getTotalUser();
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'lấy tổng người dùng thành công',
                         totalUser: response.totalUser,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lỗi server',
                         error: response.error,
                    })
               );
          }
     };
}

export default AuthCtr;
