import {Router} from 'express';
import * as reviewController from './controller/reviews.controller.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const router = Router();

router.get('/', reviewController.getReviews)
    .get('/:id',protectedRoutes, reviewController.getReview)
    .post('/',protectedRoutes, reviewController.addReview)
    .put('/:id',protectedRoutes, reviewController.updateReview)
    .delete('/:id',protectedRoutes ,allowedTo('admin') , reviewController.deleteReview);
export default router