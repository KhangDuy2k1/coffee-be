import express from 'express';
import AuthMiddleware from '../middlewares/auth';
import Endpoint from '../common/endpoint';
import { WalletController } from '../controllers/wallet';
const authMiddleware = new AuthMiddleware();
const walletController = new WalletController();
export const walletRouter = express.Router();

walletRouter.post(
     Endpoint.CREATE_WALLET,
     authMiddleware.VerifyAccount,
     walletController.createWallet
);
walletRouter.put(
     Endpoint.LOADED_MONEY,
     authMiddleware.VerifyAccount,
     walletController.loadedMoney
);
walletRouter.put(
     Endpoint.CANCLE_ORDER_PAY,
     authMiddleware.VerifyAccount,
     walletController.cancle
);
walletRouter.get(
     Endpoint.GET_WALLET_USER,
     authMiddleware.VerifyAccount,
     walletController.getWalletUser
);
walletRouter.post(
     Endpoint.PAYMENT,
     authMiddleware.VerifyAccount,
     walletController.pay
);
