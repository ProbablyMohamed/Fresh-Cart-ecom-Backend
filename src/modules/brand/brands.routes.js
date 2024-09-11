import {Router} from 'express';
import * as brandController from './controller/brands.controller.js'
import validation from '../../middleware/validation.js';
import uploadFile, { customValidation } from '../../middleware/uploadFile.js'
import { addBrandSchema } from './brands.validation.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.get('/',protectedRoutes, brandController.getBrands)
      .get('/:_id', brandController.getBrand)
      .post('/',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'brand').single('image'),validation(addBrandSchema), brandController.addBrand)
      .put('/:_id',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'brand').single('image'),validation(addBrandSchema), brandController.updateBrand)
      .delete('/:_id',protectedRoutes,allowedTo('admin'), brandController.deleteBrand);







export default router