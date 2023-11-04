import mongoose from 'mongoose';

export interface IWallet {
     id_user?: mongoose.Types.ObjectId;
     amountMoney: number;
}
