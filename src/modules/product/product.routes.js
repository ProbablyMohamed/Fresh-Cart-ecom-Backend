import { Router } from 'express';
import * as productController from './controller/product.controller.js';
import uploadFile, { customValidation } from '../../middleware/uploadFile.js';
import validation from '../../middleware/validation.js';
import { addProductSchema } from './product.validation.js';

import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();

router.get('/', productController.getProducts)
    .get('/:_id', productController.getProduct)
    .post('/',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'product').fields([{name:'mainImage',maxCount:1},{name:'coverImage',maxCount:5}]),validation(addProductSchema), productController.addProduct)
    .put('/:_id',protectedRoutes,allowedTo('admin'),uploadFile(customValidation.images,'product').fields([{name:'mainImage',maxCount:1},{name:'coverImage',maxCount:5}]), productController.updateProduct)
    .delete('/:_id',protectedRoutes,allowedTo('admin'), productController.deleteProduct);

export default router;
