import Endpoint from '../common/endpoint';
import { StarController } from '../controllers/starController';
const starController = new StarController();
import AuthMiddleware from '../middlewares/authMiddleware';
const authMiddleware = new AuthMiddleware();
import express from 'express';
export const reviewsRouter = express.Router();
reviewsRouter.post(
     Endpoint.REVIEWS_COFFEE,
     authMiddleware.VerifyAccount,
     starController.coffeeReviews
);
