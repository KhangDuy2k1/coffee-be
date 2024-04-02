import CategoryModel from '../models/category';
import ICategory from '../models/category/iCategory';
import { Res_Category } from '../helpers/interfaces';
export class CategoryService {
     addCategory = async (body: { title: string }): Promise<Res_Category> => {
          try {
               const newCategory: ICategory = await CategoryModel.create(body);
               return {
                    success: true,
                    categogy: newCategory,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     updateCategory = async (
          body: { title: string },
          params: { category_id: string }
     ): Promise<Res_Category> => {
          try {
               const newCategory: ICategory | null =
                    await CategoryModel.findByIdAndUpdate(
                         params.category_id,
                         body,
                         {
                              new: true,
                         }
                    );
               if (newCategory == null) {
                    return {
                         success: false,
                    };
               }
               return {
                    success: true,
                    categogy: newCategory,
               };
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     deleteCategory = async (params: {
          category_id: string;
     }): Promise<Res_Category> => {
          try {
               const CategoryDeleted: ICategory | null =
                    await CategoryModel.findByIdAndDelete(params.category_id);
               if (CategoryDeleted == null) {
                    return {
                         success: false,
                    };
               } else {
                    return {
                         success: true,
                         categogy: CategoryDeleted,
                    };
               }
          } catch (error: any) {
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
     getAllCategory = async (): Promise<{
          success: boolean;
          allcategory?: ICategory[];
          error?: any;
     }> => {
          try {
               const AllCategory: ICategory[] = await CategoryModel.find();
               return {
                    success: true,
                    allcategory: AllCategory,
               };
          } catch (error: any) {
               console.error(error);
               return {
                    success: false,
                    error: error.message,
               };
          }
     };
}
