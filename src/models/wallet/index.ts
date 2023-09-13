import mongoose, { Schema } from 'mongoose';
import { IWallet } from './IWallet';
const walletSchema: Schema<IWallet> = new mongoose.Schema<IWallet>({
     id_user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
     },
     amountMoney: {
          type: Number,
          default: 0,
     },
});
export default mongoose.model('Wallet', walletSchema);
