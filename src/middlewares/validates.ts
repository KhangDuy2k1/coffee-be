import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { StatusCode } from '../common/statusCode';
export class ValidatesMiddleware {
     validateRegister = (req: Request, res: Response, next: NextFunction) => {
          const body: { email: string; password: string; phonenumber: string } =
               req.body;
          if (!validator.isEmail(body.email)) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'email khong dung dinh dang',
                    })
               );
          } else if (
               !validator.isLength(body.password, { min: 6, max: undefined })
          ) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'password toi thieu 6 ki tu',
                    })
               );
          } else if (!validator.isMobilePhone(body.phonenumber, 'vi-VN')) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'số điện thoại không đúng',
                    })
               );
          } else {
               next();
          }
     };
     validateLogin = (req: Request, res: Response, next: NextFunction) => {
          const body: { email: string; password: string } = req.body;
          if (!validator.isEmail(body.email)) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'email khong dung dinh dang',
                    })
               );
          } else if ( 
               !validator.isLength(body.password, { min: 6, max: undefined })
          ) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         mes: 'password toi thieu 6 ki tu',
                    })
               );
          } else {
               next();
          }
     };
}
