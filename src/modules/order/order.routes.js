import {Router} from 'express';
import * as orderController from './controller/order.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.post('/:id', protectedRoutes, allowedTo('user','admin') , orderController.createCashOrder)
.get('/',protectedRoutes,allowedTo('admin') , orderController.getAllOrders)
.get('/users',protectedRoutes,allowedTo('admin','user') , orderController.getUserOrders)
.post('/checkout/:id',protectedRoutes, orderController.createCheckoutSession)

export default router