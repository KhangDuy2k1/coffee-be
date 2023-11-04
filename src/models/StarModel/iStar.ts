import mongoose from 'mongoose';

export interface IStar {
     id_user?: mongoose.Types.ObjectId;
     id_coffee?: mongoose.Types.ObjectId;
     stars: number;
}
