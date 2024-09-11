import { Router } from 'express';
import * as userController from './controller/user.controller.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { allowedTo } from '../auth/auth.controller.js';

const router = Router();

router.post('/',checkEmail, userController.addUser)   
    .get('/',allowedTo('admin') ,  userController.allUsers)
    .get('/:id', userController.getUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

export default router;
