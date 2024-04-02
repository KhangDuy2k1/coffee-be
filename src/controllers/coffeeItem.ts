import express, { Request, Response } from 'express';
import CoffeeItemService from '../Services/coffeeItem';
// import CategoryModel from '../models/CategoryModel';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkId';
const CoffeeItem = new CoffeeItemService();
class CoffeeITemCtr {
     createCoffee = async (req: Request, res: Response) => {
          const body: {
               name: string;
               price: number;
               volume: number;
               image: string;
               desc: string;
               category?: string;
          } = req?.body;
          const createCoffee = await CoffeeItem.createCoffee(body);
          if (createCoffee.success) {
               return res.status(StatusCode.CREATED).json({
                    success: true,
                    mes: 'them coffee thanh cong',
                    coffee: createCoffee?.coffeeCreaeted,
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: 'lỗi server',
                    error: createCoffee.error,
               });
          }
     };
     updateCoffee = async (req: Request, res: Response) => {
          const body: {
               name: string;
               price: number;
               volume: number;
               image: string;
               desc: string;
               category?: string;
          } = req.body;
          const { id } = req.params;
          CheckId(id);
          const updatedCoffee = await CoffeeItem.updateCoffee({ id: id }, body);
          if (updatedCoffee?.coffee == null) {
               return res.status(StatusCode.BAD_REQUEST).json({
                    mes: 'khong the update Coffee',
               });
          } else if (updatedCoffee.success) {
               return res.status(StatusCode.OK).json({
                    success: true,
                    mes: 'cap nhat thanh cong',
                    coffee: updatedCoffee.coffee,
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: 'lỗi server',
                    error: updatedCoffee.error,
               });
          }
     };
     deleteCoffee = async (req: Request, res: Response) => {
          const { id } = req?.params;
          CheckId(id);
          const deleteCoffee = await CoffeeItem.deleteCoffee({
               id: id,
          });
          console.log(deleteCoffee);
          if (deleteCoffee.success) {
               return res.status(StatusCode.OK).json({
                    success: true,
                    mes: 'xóa thành công',
                    deleteCoffee: deleteCoffee.Coffee,
               });
          } else if (deleteCoffee.Coffee == null) {
               return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    mes: 'coffee không có trong cơ sở dữ liệu',
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: 'lỗi server',
                    error: deleteCoffee.error,
               });
          }
     };

     getAllCoffee = async (req: Request, res: Response) => {
          const allCoffee = await CoffeeItem.getAllCoffee();
          if (allCoffee.success) {
               return res.status(StatusCode.OK).json({
                    success: true,
                    mes: 'get Coffee thanh cong',
                    allCoffee: allCoffee,
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: 'lỗi server',
                    error: allCoffee.error,
               });
          }
     };
     getCoffeeById = async (req: Request, res: Response) => {
          const { id } = req.params;
          CheckId(id);
          const CoffeeByid = await CoffeeItem.getCoffeeById(id);
          return res.status(StatusCode.OK).json({
               success: true,
               mes: 'lay coffee thanh cong',
               CoffeeByid: CoffeeByid,
          });
     };
     findCoffee = async (req: Request, res: Response) => {
          const keyword: any = req?.query.keyword;
          if (!keyword) {
               return res.status(StatusCode.BAD_REQUEST).json({
                    mes: 'tu khoa chua duoc truyen len',
               });
          }
          const Coffee = await CoffeeItem.SearchCoffee(keyword);
          if (Coffee?.success) {
               return res.status(StatusCode.OK).json({
                    mes: 'tìm thành công',
                    coffee: Coffee.coffee,
               });
          } else {
               return res.status(StatusCode.BAD_REQUEST).json({
                    mes: 'Không có sản phẩm phù hợp',
               });
          }
     };
     likeCoffee = async (req: Request, res: Response) => {
          const user_id: string = (req as any).user._id;
          const { coffee_id } = req.params;
          CheckId(coffee_id);
          const response = await CoffeeItem.likeCoffee(user_id, {
               coffee_id: coffee_id,
          });
          console.log(response);
          if (response.success) {
               return res.status(StatusCode.OK).json({
                    userliked: response.userLiked,
                    success: true,
                    mes: response.mes,
               });
          } else if (!response.error) {
               return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    mes: response.mes,
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: response.mes,
                    error: response.error,
               });
          }
     };
     unlikeCoffee = async (
          req: Request<{ coffee_id: string }>,
          res: Response
     ) => {
          const user_id: string = (req as any).user._id;
          console.log(user_id);
          const params: { coffee_id: string } = req.params;
          CheckId(params.coffee_id);
          const response = await CoffeeItem.unlikeCoffee(user_id, params);
          if (response.success) {
               return res.status(StatusCode.OK).json({
                    user_unlike: response.User_unlike,
                    success: true,
                    mes: response.mes,
               });
          } else if (!response.error) {
               return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    mes: response.mes,
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: response.mes,
                    error: response.error,
               });
          }
     };
     getCoffeeLiked = async (req: Request, res: Response) => {
          const user_id: string = (req as any).user._id;
          const response = await CoffeeItem.getCoffeeLiked(user_id);
          if (response?.success) {
               return res.status(StatusCode.OK).json({
                    success: true,
                    mes: 'like thành công',
                    listCoffeeLiked: response.listCoffeeLike,
               });
          } else if (!response?.error) {
               return res.status(StatusCode.NOT_FOUND).json({
                    success: false,
                    mes: 'chưa like coffee nào',
               });
          } else {
               return res.status(StatusCode.SERVER_ERROR).json({
                    success: false,
                    mes: response.mes,
                    error: response.error,
               });
          }
     };
}
export default CoffeeITemCtr;
