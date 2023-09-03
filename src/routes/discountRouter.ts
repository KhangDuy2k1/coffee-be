import { DiscountCtr } from '../controllers/discountController';
const discountCtr = new DiscountCtr();
import express from 'express';
import Endpoint from '../common/endpoint';
const discountRouter = express.Router();
discountRouter.post(Endpoint.CREATE_DISCOUNT, discountCtr.discount);
