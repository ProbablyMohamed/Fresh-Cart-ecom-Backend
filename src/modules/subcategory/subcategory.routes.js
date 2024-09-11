import { Router } from 'express';
import * as subCategoryController from './controller/subcategory.controller.js';
import uploadFile, { customValidation } from '../../middleware/uploadFile.js'

import validation from '../../middleware/validation.js';
import { addSubCategorySchema } from './subcategory.validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';
const router = Router({mergeParams: true});


router.get('/', subCategoryController.getSubCategories)
      .get('/:_id', subCategoryController.getSubCategory)
      .post('/',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'subcategory').single('image'),validation(addSubCategorySchema), subCategoryController.addSubCategory)
      .put('/:_id',protectedRoutes,allowedTo('admin'), subCategoryController.updateSubCategory)
      .delete('/:_id',protectedRoutes,allowedTo('admin'), subCategoryController.deleteSubCategory);

export default router;
