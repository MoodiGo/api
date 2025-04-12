import { userLifestyleRepository, userRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { FirebaseUserData, PostUserProfileRequest, PostUserProfileResponse } from "../../../domain/use-cases/PostUserProfile";
import { Request } from 'express';
import { UserLifestyleRepository } from "../../../domain/repositories/UserLifestyleRepository";
import { PutUserProfileRequest, PutUserProfileResponse } from "../../../domain/use-cases/PutUserProfile";
import { ControllerBase } from "./ControllerBase";

export class UserController extends ControllerBase {
    private userRepository:UserRepository;
    private userLSRepository:UserLifestyleRepository;

    constructor() {
        super();
        this.userRepository = userRepository;
        this.userLSRepository = userLifestyleRepository;
    }

    async getUserProfile(req: any, res: any) {
        // TODO - VERIFICAR SE REALMENTE PRECISA 
        // const uid = req.user?.uid;

        // TODO - descomentar essa linha e verificar se o uid existe
        // if (!uid) {
        //     return res.status(401).send({"message": "Unauthorized"});
        // }

        // TODO - substituir pelo uid do token
        this.userRepository.get("9813jhsalknd219paskd").then((result) => {
            if (result.data) {
                return this.send(res, 200, "User found", result.data);
            }   
            else {
                return this.send(res, 404, "User not found");
            }
        }
        ).catch((err : any) => {
            return this.send(res, 500, "Internal server error", err);
        });
    }

    async createUserProfile(req: Request, res: any) {
        try {
            if(!this.validateBodyPresence(req.body) || !PostUserProfileRequest.validate(req.body)){
                return this.sendErrorInvalidBody(res, PostUserProfileRequest.getSchema());
            }

            const firebaseUserData = new FirebaseUserData(req.user!);

            const userAdded = await this.userRepository.create(req.body, firebaseUserData);
            const lsAdded = await this.userLSRepository.create(userAdded)

            return this.send(res, 201, "User created", {
                user: userAdded,
                lifestyle: lsAdded
            } as PostUserProfileResponse);
        } catch (error) {
            return this.sendError(res, error, "Error creating user profile");
        }
    }

    async updateUserProfile(req: Request, res: any) {
        try {
            if(!this.validateBodyPresence(req.body) || !PutUserProfileRequest.validate(req.body)){
                return this.sendErrorInvalidBody(res, PutUserProfileRequest.getSchema());
            }

            const userUpdated = await this.userRepository.update(req.body, req.user?.uid!);

            return res.status(200).send({"message": "User updated", 
                data: {
                    user: userUpdated,
                } as PutUserProfileResponse
            });
        } catch (error) {
            return this.sendError(res, error, "Error updating user profile");
        }
    }
}