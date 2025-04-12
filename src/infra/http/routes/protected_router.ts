import { Router } from 'express';
import { UserController } from '../controllers/UserController';



export const initProtectedRouter = () : Router => {
    const router = Router();

    // TODO - descomentar essa linha e verificar se o token é valido
    // router.use(verifyUserToken);

    
    // GET - user profile
    router.get('/user', (req, res) => new UserController().getUserProfile(req, res));

    // POST - create profile
    router.post('/user', (req, res) => new UserController().createUserProfile(req, res));    

    // GET - user favorites
    // POST - user favorites
    // DELETE - user favorites



    return router;
}
