import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyUserToken } from '../middlewares/verifyUserToken';



export const initProtectedRouter = () : Router => {
    const router = Router();

    router.use(verifyUserToken);

    
    // GET - user profile
    router.get('/user', async (req: Request, res: Response) => {
        const userController = new UserController();
        await userController.getUserProfile(req, res);
    });

    // POST - create profile
    router.post('/user', async (req: Request, res: Response) => {
        const userController = new UserController();
        await userController.createUserProfile(req, res);
    });    

    // PUT - update profile
    router.put('/user', async (req: Request, res: Response) => {
        const userController = new UserController();
        await userController.updateUserProfile(req, res);
    });

    // DELETE - delete profile
    router.delete('/user', async (req: Request, res: Response) => {
        const userController = new UserController();
        await userController.deleteUserProfile(req, res);
    });

    // GET - user favorites
    // POST - user favorites
    // DELETE - user favorites



    return router;
}
