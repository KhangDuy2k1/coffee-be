import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import Endpoint from '../common/endpoint';
import { WalletController } from '../controllers/walletController';
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
     Endpoint.REFUND,
     authMiddleware.VerifyAccount,
     walletController.cancle
);
walletRouter.get(
     Endpoint.GET_WALLET_USER,
     authMiddleware.VerifyAccount,
     walletController.getWalletUser
);
