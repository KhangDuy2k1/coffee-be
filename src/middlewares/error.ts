// class ServerError extends Error {
//      message: string;
//      status: number;
//      constructor(message: string, status: number) {
//           super();
//           this.message = message;
//           this.status = status;
//      }
// }
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../common/statusCode';

// export class UnauthorizedError extends ServerError {
//      constructor(message: string = 'Unauthorized') {
//           super(message, 401);
//      }
// }
// export class BadRequestError extends ServerError {
//      constructor(message: string = 'BadRequestError') {
//           super(message, 400);
//      }
// }
// export class ForbiddenError extends ServerError {
//      constructor(message: string = 'ForbiddenError') {
//           super(message, 403);
//      }
// }
export class ErrorUrl {
     errUrl = (req: Request, res: Response, next: NextFunction) => {
          return (
               res.status(StatusCode.NOT_FOUND),
               res.json({
                    mes: 'không tìm thấy đường dẫn',
               })
          );
     };
}
