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
               if (findWallet) {
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
               const respone: any = await walletModel.find({
                    id_user: id_user,
               });
               if (!respone) {
                    return {
                         success: false,
                         mes: 'chưa có ví',
                    };
               } else {
                    let beforeNumberMoney: number = respone.amountMoney;
                    let afferNumberMoney: number = beforeNumberMoney + money;
                    respone.amountMoney = afferNumberMoney;
                    await respone.save();
                    return {
                         success: true,
                         mes: 'nạp tiền thành công',
                    };
               }
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     refund = async (id_user: string, id_order: string) => {
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
                    const userWallet: any = await walletModel.find({
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
}
