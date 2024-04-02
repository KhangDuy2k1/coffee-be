import jwt from 'jsonwebtoken';
import JWT_Mes from '../common/jwt';
import { ResDataToken } from './interfaces';
class GenarateToken {
     private id: string;
     constructor(id: string = '') {
          this.id = id;
     }
     accessToken = (): string => {
          const AccessToken: string = jwt.sign(
               { id: this.id },
               JWT_Mes.SECRET_KEY_ACCESS_TOKEN,
               {
                    expiresIn: JWT_Mes.ACCESS_TOKEN_EXPIRATION_TIME,
               }
          );
          return AccessToken;
     };
     refreshToken = (): string => {
          const RefreshToken: string = jwt.sign(
               { id: this.id },
               JWT_Mes.SECRET_KEY_REFRESH_TOKEN,
               {
                    expiresIn: JWT_Mes.REFRESH_TOKEN_EXPIRATION_TIME,
               }
          );
          return RefreshToken;
     };
     verifyAccessToken = (accessToken: string): ResDataToken => {
          try {
               const decodeAccessToken = jwt.verify(
                    accessToken,
                    JWT_Mes.SECRET_KEY_ACCESS_TOKEN
               );
               return {
                    success: true,
                    decode: decodeAccessToken,
               };
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
     verifyRefreshToken = (refreshToken: string): ResDataToken => {
          try {
               const decodeRefreshToken = jwt.verify(
                    refreshToken,
                    JWT_Mes.SECRET_KEY_REFRESH_TOKEN
               );
               return {
                    success: true,
                    decode: decodeRefreshToken,
               };
          } catch (error) {
               return {
                    success: false,
                    error: error,
               };
          }
     };
}
export default GenarateToken;
