import {Router} from 'express';
import * as cartController from './controller/cart.controller.js'
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.post('/', protectedRoutes,allowedTo('admin') ,  cartController.addToCart)
.put('/:id', protectedRoutes,allowedTo('admin') ,  cartController.UpdateQuantity)
.delete('/:id', protectedRoutes, allowedTo('admin') , cartController.RemoveItemFromCart)
.get('/',protectedRoutes, cartController.getUserCart)
.delete('/',protectedRoutes, allowedTo('admin') ,cartController.clearUserCart)
.post('/apply-coupon', protectedRoutes,allowedTo('admin') ,  cartController.applyCoupon)




export default router