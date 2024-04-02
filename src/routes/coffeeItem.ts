import express from 'express';
import Endpoint from '../common/endpoint';
import CoffeeITemCtr from '../controllers/coffeeItem';
import AuthMiddleware from '../middlewares/auth';
const CoffeeItemRouter = express.Router();
const MiddlewareAuth = new AuthMiddleware();
const CoffeeCtr = new CoffeeITemCtr();
CoffeeItemRouter.get(
     Endpoint.FIND_COFFEE,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.findCoffee
);
CoffeeItemRouter.post(
     Endpoint.ADD_COFFEE,
     MiddlewareAuth.VerifyAccount,
     MiddlewareAuth.isAdmin,
     CoffeeCtr.createCoffee
);
CoffeeItemRouter.delete(
     Endpoint.DELETE_COFFEE,
     MiddlewareAuth.VerifyAccount,
     MiddlewareAuth.isAdmin,
     CoffeeCtr.deleteCoffee
);
CoffeeItemRouter.get(
     Endpoint.GET_ALL_COFFEE,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.getAllCoffee
);
CoffeeItemRouter.put(
     Endpoint.UPDATE_COFFEE,
     MiddlewareAuth.VerifyAccount,
     MiddlewareAuth.isAdmin,
     CoffeeCtr.updateCoffee
);
CoffeeItemRouter.get(
     Endpoint.GET_COFFEE_BY_ID,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.getCoffeeById
);
CoffeeItemRouter.put(
     Endpoint.LIKE_COFFEE,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.likeCoffee
);
CoffeeItemRouter.put(
     Endpoint.UNLIKE_COFFEE,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.unlikeCoffee
);
CoffeeItemRouter.get(
     Endpoint.GET_COFFEE_LIKED,
     MiddlewareAuth.VerifyAccount,
     CoffeeCtr.getCoffeeLiked
);
export default CoffeeItemRouter;
