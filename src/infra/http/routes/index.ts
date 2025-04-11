import { Router } from 'express';

import { authRouter } from './auth_router';
import { protectedRouter } from './protected_router';
import { publicRouter } from './public_router';


export const router = Router();
router.use('/public', publicRouter);
router.use('/private', protectedRouter);	
router.use('/auth', authRouter);