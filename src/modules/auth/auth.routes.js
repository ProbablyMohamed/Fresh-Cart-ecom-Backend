import { Router } from 'express';
import { checkEmail } from '../../middleware/checkEmail.js';
import { changeUserPassword, signin, signup } from './auth.controller.js';
const router = Router();

router.post('/signup', checkEmail, signup)
    .post('/signin', signin)
    .patch('/changePassword',changeUserPassword)
export default router;
