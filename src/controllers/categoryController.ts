import { Request, Response } from 'express';
import { CategoryService } from '../Services/categoryService';
import { StatusCode } from '../common/statusCode';
import CheckId from '../helpers/checkIdHelper';
import ICategory from '../models/CategoryModel/iCategory';
const Category: CategoryService = new CategoryService();
interface ResJson {
     success: boolean;
     mes: string;
     category?: {
          title: string;
     };
     error?: any;
}
export class CategoryCtrl {
     addCategory = async (req: Request, res: Response): Promise<any> => {
          const body: { title: string } = req.body;
          const response = await Category.addCategory(body);
          if (response?.success) {
               const resSuccess: ResJson = {
                    success: true,
                    mes: 'thêm category thành công',
                    category: response.categogy,
               };

               return res.status(StatusCode.OK).json(resSuccess);
          } else {
               const resFail: ResJson = {
                    success: false,
                    mes: 'lỗi server',
                    error: response?.error,
               };
               return res.status(StatusCode.SERVER_ERROR).json(resFail);
          }
     };
     updateCategory = async (
          req: Request<{ category_id: string }>,
          res: Response
     ): Promise<any> => {
          const body: { title: string } = req.body;
          const params: { category_id: string } = req.params;
          CheckId(params.category_id);
          const response = await Category.updateCategory(body, params);
          if (response?.success) {
               const resSuccess: ResJson = {
                    success: true,
                    mes: 'update thanh cong',
                    category: response.categogy,
               };
               return res.status(StatusCode.BAD_REQUEST).json(resSuccess);
          } else if (response.error) {
               const resError: ResJson = {
                    success: false,
                    mes: 'co loi xay ra',
                    error: response.error,
               };
               return res.status(StatusCode.SERVER_ERROR).json(resError);
          } else {
               const resFail: ResJson = {
                    success: false,
                    mes: 'khong tim thay coffee can update',
               };
               return res.status(StatusCode.BAD_REQUEST).json(resFail);
          }
     };
     deleteCategory = async (
          req: Request<{ category_id: string }>,
          res: Response
     ): Promise<any> => {
          const params: { category_id: string } = req.params;
          CheckId(params.category_id);
          const response = await Category.deleteCategory(params);
          if (response?.success) {
               const resSuccess: ResJson = {
                    success: true,
                    mes: 'xoa thanh cong',
                    category: response.categogy,
               };
               return res.status(StatusCode.OK).json(resSuccess);
          } else if (response.error) {
               const resError: ResJson = {
                    success: false,
                    mes: 'xay ra loi',
               };
               return res.status(StatusCode.OK).json(resError);
          } else {
               const resFail: ResJson = {
                    success: false,
                    mes: 'khong tim thay coffee de xoa',
               };
               return res.status(StatusCode.BAD_REQUEST).json(resFail);
          }
     };
     getAllCategory = async (req: Request, res: Response): Promise<any> => {
          interface ResAllCategory {
               success: boolean;
               mes: string;
               allcategory?: {
                    title: string;
               }[];
               error?: any;
          }
          const response = await Category.getAllCategory();
          if (response.success) {
               const resSuccess: ResAllCategory = {
                    success: true,
                    mes: 'lay all category thanh cong',
                    allcategory: response.allcategory,
               };
               return res.status(StatusCode.OK).json(resSuccess);
          } else {
               const resError: ResAllCategory = {
                    success: false,
                    mes: 'xay ra loi',
                    error: response.error,
               };
               return res.status(StatusCode.SERVER_ERROR).json(resError);
          }
     };
}
