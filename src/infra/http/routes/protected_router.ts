import { Router } from 'express';
import { verifyUserToken } from '../middlewares/verifyUserToken';
// import { getProfile } from '../controllers/auth';


export const protectedRouter = Router();
protectedRouter.use(verifyUserToken);

// GET - user profile
protectedRouter.get('/user', () => console.log("User profile route"));

// GET - user favorites
// POST - user favorites
// DELETE - user favorites

