import Endpoint from '../common/endpoint';
import { StarController } from '../controllers/star';
const starController = new StarController();
import AuthMiddleware from '../middlewares/auth';
const authMiddleware = new AuthMiddleware();
import express from 'express';
export const reviewsRouter = express.Router();
reviewsRouter.post(
     Endpoint.REVIEWS_COFFEE,
     authMiddleware.VerifyAccount,
     starController.coffeeReviews
);
