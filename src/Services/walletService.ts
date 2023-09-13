import OrderModel from '../models/OrderModel';
import UserModel from '../models/UserModel';
import walletModel from '../models/wallet';
import { IWallet } from '../models/wallet/IWallet';
export class WalletService {
     createWallet = async (id_user: string) => {
          try {
               const findWallet = await walletModel.find({
                    id_user: id_user,
               });
               console.log(findWallet);
               if (findWallet.length > 0) {
                    return {
                         success: false,
                         mes: 'đã tạo ví',
                    };
               } else {
                    const responeCreate = await walletModel.create({
                         id_user: id_user,
                    });
                    return {
                         success: true,
                         mes: 'tạo ví thành công',
                         wallet: responeCreate,
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     loadedMoney = async (id_user: string, money: number) => {
          try {
               const response: any = await walletModel.findOne({
                    id_user: id_user,
               });
               if (!response) {
                    return {
                         success: false,
                         mes: 'chưa có ví',
                    };
               } else {
                    console.log(response.amountMoney);
                    let beforeNumberMoney = response.amountMoney;

                    let afferNumberMoney: number = beforeNumberMoney + money;
                    console.log(money);
                    console.log(afferNumberMoney);
                    const reponseLoadedMoney =
                         await walletModel.findByIdAndUpdate(response._id, {
                              amountMoney: afferNumberMoney,
                         });
                    return {
                         success: true,
                         mes: 'nạp tiền thành công',
                         walletLoaded: reponseLoadedMoney,
                    };
               }
          } catch (error) {
               console.error(error);
               return {
                    success: false,
                    error: error,
               };
          }
     };
     cancle = async (id_user: string, id_order: string) => {
          try {
               const order: any =
                    await OrderModel.findById(id_order).populate(
                         'coffeeItem_id'
                    );
               if (!order) {
                    return {
                         success: false,
                         mes: 'không tìm thấy id đơn hàng',
                    };
               } else {
                    let priceCoffee: number = order.coffeeItem_id.price;
                    const userWallet: any = await walletModel.findOne({
                         id_user: id_user,
                    });
                    if (!userWallet) {
                         return {
                              success: false,
                              mes: 'không tìm thấy ví',
                         };
                    } else {
                         let tienHienCo = userWallet.amountMoney;
                         let tienSaukhiHoan =
                              tienHienCo + priceCoffee * order.quantity;
                         userWallet.amountMoney = tienSaukhiHoan;
                         const walletAfter = await userWallet.save();
                         order.status = 'đã hủy';
                         await order.save();
                         return {
                              success: true,
                              mes: 'hoàn tiền thành công',
                              wallet: walletAfter,
                         };
                    }
               }
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     getWalletUser = async (id_user: string) => {
          try {
               const respone = await walletModel.findOne({
                    id_user: id_user,
               });
               if (!respone) {
                    return {
                         success: false,
                         mes: 'Không tìm thấy ví',
                    };
               } else {
                    return {
                         success: true,
                         mes: 'lấy ví thành công',
                         wallet: respone,
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    mes: 'lỗi server',
                    error: error,
               };
          }
     };
}
