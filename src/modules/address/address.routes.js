import {Router} from 'express';
import * as addressController from './controller/address.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.get('/',protectedRoutes,allowedTo('admin','user') , addressController.getUserAddress)
      .patch('/', protectedRoutes, allowedTo('admin','user') , addressController.addAddress)
      .delete('/:id', protectedRoutes,allowedTo('admin','user') ,  addressController.RemoveAddress)
   







export default router