import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyUserToken } from '../middlewares/verifyUserToken';
import { UserLifestyleController } from '../controllers/UserLifestyleController';
import { UserWeatherController } from '../controllers/UserWeatherController';
import { RoutesProtected } from '../routes';
import { UserVibeController } from '../controllers/UserVibeController';


/**
 * Initializes the protected router with user authentication middleware and routes.
 * @returns {Router} The configured router instance.
 */
export const initProtectedRouter = () : Router => {
    const router = Router();

    router.use(verifyUserToken);

    
    // GET - user profile
    router.get(RoutesProtected.USER, async (req: Request, res: Response) => {
        const controller = new UserController();
        await controller.getUserProfile(req, res);
    });

    // POST - create profile
    router.post(RoutesProtected.USER, async (req: Request, res: Response) => {
        const controller = new UserController();
        await controller.createUserProfile(req, res);
    });    

    // PUT - update profile
    router.put(RoutesProtected.USER, async (req: Request, res: Response) => {
        const controller = new UserController();
        await controller.updateUserProfile(req, res);
    });

    // DELETE - delete profile
    router.delete(RoutesProtected.USER, async (req: Request, res: Response) => {
        const controller = new UserController();
        await controller.deleteUserProfile(req, res);
    });

    // PUT - user lifestyle
    router.put(RoutesProtected.USER_LIFESTYLE, async (req: Request, res: Response) => {
        const controller = new UserLifestyleController();
        await controller.updateUserLifestyle(req, res);
    });

    // POST - user-weather relation
    router.post(RoutesProtected.USER_WEATHER, async (req: Request, res: Response) => {
        const controller = new UserWeatherController();
        await controller.createUserWeather(req, res);
    });

    // POST - user-vibe relation
    router.post(RoutesProtected.USER_VIBE, async (req: Request, res: Response) => {
        const controller = new UserVibeController();
        await controller.createUserVibe(req, res);
    });

    // GET - user favorites
    // POST - user favorites
    // DELETE - user favorites

    return router;
}
