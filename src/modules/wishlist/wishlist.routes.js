import {Router} from 'express';
import * as wishlistController from './controller/wishlist.controller.js'
import { protectedRoutes } from '../auth/auth.controller.js';

const router = Router();
router.get('/',protectedRoutes, wishlistController.getUserWishlist)
      .patch('/', protectedRoutes,  wishlistController.addWishlist)
      .delete('/:id', protectedRoutes,  wishlistController.RemoveFromWishlist)
   







export default router