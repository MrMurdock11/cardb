import express from 'express';

import authController from './auth.controller';
import { checkSignIn } from './middleware';

const router = express.Router();

router.post('/auth/sign-in', checkSignIn, authController.signIn);

export default router;
