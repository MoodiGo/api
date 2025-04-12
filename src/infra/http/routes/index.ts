import { Router } from 'express';
import { authRouter } from './auth_router';
import { initProtectedRouter } from './protected_router';
import { publicRouter } from './public_router';


export const initRouter = () : Router => {
    const router = Router();
    router.use('/public', publicRouter);
    router.use('/private', initProtectedRouter());	
    router.use('/auth', authRouter);

    return router;
}