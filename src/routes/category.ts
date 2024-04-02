//=====================
//=====================
import express from 'express';
import { CategoryCtrl } from '../controllers/category';
import Endpoint from '../common/endpoint';
import AuthMiddleware from '../middlewares/auth';
export const CategoryRouter = express.Router();
const Category = new CategoryCtrl();
const middlewaresAuth = new AuthMiddleware();
CategoryRouter.post(
     Endpoint.ADD_CATEGORY,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     Category.addCategory
);
CategoryRouter.put(
     Endpoint.UPDATE_CATEGORY,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     Category.updateCategory
);
CategoryRouter.delete(
     Endpoint.DELETE_CATEGORY,
     middlewaresAuth.VerifyAccount,
     middlewaresAuth.isAdmin,
     Category.deleteCategory
);
CategoryRouter.get(
     Endpoint.GET_ALL_CATEGORY,
     middlewaresAuth.VerifyAccount,
     Category.getAllCategory
);
//============================================
