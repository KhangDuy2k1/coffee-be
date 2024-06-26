import express from 'express';
import Endpoint from '../common/endpoint';
import AuthCtr from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';
import { ValidatesMiddleware } from '../middlewares/validates';
const validatesMiddleware = new ValidatesMiddleware();
const AuthRouter = express.Router();
const authCtr = new AuthCtr();
const middlewaresAuth = new AuthMiddleware();
AuthRouter.post(
     Endpoint.REGISTER,
     validatesMiddleware.validateRegister,
     authCtr.Register
);
AuthRouter.post(
     Endpoint.LOGIN,
     validatesMiddleware.validateLogin,
     authCtr.Login
);
AuthRouter.post(
     Endpoint.REFRESH_TOKEN,
     middlewaresAuth.VerifyAccount,
     authCtr.Refresh
);
AuthRouter.get(
     Endpoint.GET_ALLUSER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.getAllUser
);
AuthRouter.put(
     Endpoint.UPDATE_USER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.updateUser
);
AuthRouter.delete(
     Endpoint.DELETE_USER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.deleteUser
);
AuthRouter.get(
     Endpoint.GET_USER_LOGIN,
     middlewaresAuth.VerifyAccount,
     authCtr.getUserLogin
);
AuthRouter.get(
     Endpoint.GET_USER_BY_ID,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.getUserById
);
AuthRouter.get(
     Endpoint.TOTAL_USER,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     authCtr.getTotalUser
);
export default AuthRouter;
