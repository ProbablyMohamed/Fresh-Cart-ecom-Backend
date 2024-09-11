import {Router} from 'express';
import * as categoryController from './controller/category.controller.js'
import uploadFile, { customValidation } from '../../middleware/uploadFile.js'
import subCategoryRouter from '../subcategory/subcategory.routes.js'
import validation from '../../middleware/validation.js';
import { addCategorySchema } from './category.validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.get('/',categoryController.getCategories)
.get('/:_id',categoryController.getCategory)
.post('/',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'category').single('image'),validation(addCategorySchema),categoryController.addCategory)
.put('/:_id',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'category').single('image'),categoryController.updateCategory)
.delete('/:_id',protectedRoutes,allowedTo('admin'),categoryController.deleteCategory)
.use('/:_id/subCategories',protectedRoutes,subCategoryRouter)





export default router