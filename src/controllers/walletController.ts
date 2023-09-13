import { Request, Response } from 'express';
import { WalletService } from '../Services/walletService';
import { StatusCode } from '../common/statusCode';
const walletService = new WalletService();
export class WalletController {
     createWallet = async (req: Request, res: Response) => {
          const id_user: string = (req as any).user._id;
          const response = await walletService.createWallet(id_user);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'tạo ví thành công',
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: 'đã tạo ví',
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
     loadedMoney = async (req: Request, res: Response) => {
          const id_user: string = (req as any).user._id;
          const money: number = req.body.money;
          const response = await walletService.loadedMoney(id_user, money);
          if (response.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: 'nạp tiền thành công',
                         wallet: response.walletLoaded,
                    })
               );
          } else if (!response.error) {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: response.mes,
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
     cancle = async (req: Request, res: Response) => {
          const id_user: string = (req as any).user._id;
          const id_order: string = req.params.id_order;
          // console.log(id_user);
          // console.log(id_order);

          const respone = await walletService.cancle(id_user, id_order);
          console.log(respone);
          if (respone.mes === 'không tìm thấy id đơn hàng') {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: respone.mes,
                    })
               );
          } else if (respone.mes === 'không tìm thấy ví') {
               return (
                    res.status(StatusCode.BAD_REQUEST),
                    res.json({
                         success: false,
                         mes: respone.mes,
                    })
               );
          } else if (respone.success) {
               return (
                    res.status(StatusCode.OK),
                    res.json({
                         success: true,
                         mes: respone.mes,
                         wallet: respone.wallet,
                    })
               );
          } else {
               return (
                    res.status(StatusCode.SERVER_ERROR),
                    res.json({
                         success: false,
                         mes: 'lỗi server',
                         error: respone.error,
                    })
               );
          }
     };
}
