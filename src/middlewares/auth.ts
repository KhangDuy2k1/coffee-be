import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';
import GenarateToken from '../helpers/token';
import { StatusCode } from '../common/statusCode';
import { ResDataToken, ResMiddlewareAuth } from '../helpers/interfaces';
class AuthMiddleware {
     VerifyAccount = async (
          req: Request,
          res: Response,
          next: NextFunction
     ): Promise<any> => {
          try {
               if (!req.headers.authorization) {
                    const resTokenNotExist: ResMiddlewareAuth = {
                         success: false,
                         mes: 'Token chưa được gửi lên',
                    };
                    return (
                         res.status(StatusCode.BAD_REQUEST),
                         res.json(resTokenNotExist)
                    );
               } else if (req.headers.authorization?.startsWith('Bearer')) {
                    const accessToken: string =
                         req.headers.authorization?.split(' ')[1];
                    const accessTokenDecoded: ResDataToken =
                         new GenarateToken().verifyAccessToken(accessToken);
                    if (!accessTokenDecoded.success) {
                         return (
                              res.status(StatusCode.BAD_REQUEST),
                              res.json({
                                   success: false,
                                   error: accessTokenDecoded.error.message,
                              })
                         );
                    } else {
                         const user = await UserModel.findById(
                              accessTokenDecoded.decode.id
                         );
                         (req as any).user = user;
                         next();
                    }
               } else {
                    const resHeadersMalformed: ResMiddlewareAuth = {
                         success: false,
                         mes: 'headers chưa đúng định dạng',
                    };
                    return (
                         res.status(StatusCode.BAD_REQUEST),
                         res.json(resHeadersMalformed)
                    );
               }
          } catch (error: any) {
               console.error(error);
               const resError: ResMiddlewareAuth = {
                    success: false,
                    mes: 'lỗi khi verify Token',
                    error: error,
               };
               return res.status(StatusCode.SERVER_ERROR), res.json(resError);
          }
     };
     isAdmin = (req: Request, res: Response, next: NextFunction) => {
          if ((req as any).user.role !== 'admin') {
               return res.json({
                    mes: 'ban khong quyen admin de truy cap tai nguyen',
               });
          } else {
               next();
          }
     };
}
export default AuthMiddleware;
