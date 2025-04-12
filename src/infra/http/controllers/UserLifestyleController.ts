import { userLifestyleRepository, userRepository, userWeatherRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { Request, Response } from 'express';
import { UserLifestyleRepository } from "../../../domain/repositories/UserLifestyleRepository";
import { ControllerBase } from "./ControllerBase";
import { PutUserLifestyleRequest } from "../../../domain/use-cases/PutUserLifestyle";
import { UserDoesNotExistError } from "../../../shared/errors/user";

export class UserLifestyleController extends ControllerBase {
    private userRepository:UserRepository;
    private userLSRepository:UserLifestyleRepository;

    constructor() {
        super();
        this.userRepository = userRepository;
        this.userLSRepository = userLifestyleRepository;
    }

    async updateUserLifestyle(req: Request, res: Response) {
        try {
            if(!this.validateBodyPresence(req.body)) return this.sendErrorInvalidBody(res, PutUserLifestyleRequest.getSchema());    

            if(!req.user || !req.user.uid) return this.sendError(res, new Error(), "Could not set uid from token");


            const user = await this.userRepository.get(req.user.uid);

            if(!user.data) return this.sendError(res, new UserDoesNotExistError(), "User not found");

            const userLSUpdated = await this.userLSRepository.update(req.body, user.data);

            return res.status(200).send({"message": "User lifestyle updated", 
                data: {
                    user_lifestyle: userLSUpdated,
                }
            });
        } catch (error) {
            return this.sendError(res, error, "Error updating user lifestyle");
        }
    }
}