import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';



export const initProtectedRouter = () : Router => {
    const router = Router();

    // TODO - descomentar essa linha e verificar se o token é valido
    // router.use(verifyUserToken);

    
    // GET - user profile
    router.get('/user', (req: Request, res: Response) => new UserController().getUserProfile(req, res));

    // POST - create profile
    router.post('/user', async (req: Request, res: Response) => {
        const userController = new UserController();
        await userController.createUserProfile(req, res);
    });    

    // GET - user favorites
    // POST - user favorites
    // DELETE - user favorites



    return router;
}
