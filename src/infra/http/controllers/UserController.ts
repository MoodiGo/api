import { userLifestyleRepository, userRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { FirebaseUserData, PostUserProfileRequest, PostUserProfileResponse } from "../../../domain/use-cases/PostUserProfile";
import { Request } from 'express';
import { UserAlreadyExistsError } from "../../../shared/errors/user";
import { UserLifestyleAlreadyExistsError } from "../../../shared/errors/user_lifestyle";
import { UserLifestyleRepository } from "../../../domain/repositories/UserLifestyleRepository";

export class UserController {
    private userRepository:UserRepository;
    private userLSRepository:UserLifestyleRepository;

    constructor() {
        console.log("UserController constructor");
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
                return res.status(200).send({"message": "User found", "user": result.data});
            }   
            else {
                return res.status(404).send({"message": "User not found"});
            }
        }
        ).catch((err : any) => {
            return res.status(500).send({"message": "Internal server error"});
        });
    }

    async createUserProfile(req: Request, res: any) {
        // TODO - Verificar se realmente precisa
        // if (!req.user) {
            // return res.status(401).send({"message": "Unauthorized"});
        // }

        


        try {
            // TODO - substituir pelo uid do token
            if(req.body == null || req.body == undefined 
                || !(PostUserProfileRequest.fromJson(req.body) instanceof PostUserProfileRequest)){
                return res.status(406).send({
                    message: "Invalid request body. Expected structure:",
                    expected: PostUserProfileRequest.getSchema(),
                });
            }

            const firebaseUserData = new FirebaseUserData(req.user!);

            const userAdded = await this.userRepository.create(req.body, firebaseUserData);
            const lsAdded = await this.userLSRepository.create(userAdded)
            return res.status(200).send({"message": "User created", 
                data: {
                    user: userAdded,
                    lifestyle: lsAdded
                } as PostUserProfileResponse
            });
        } catch (error) {
            if(error instanceof UserAlreadyExistsError || error instanceof UserLifestyleAlreadyExistsError) {
                return res.status(409).send({"message": error.message});
            }else{
                return res.status(500).send({"message": "Internal server error"});
            }
        }
    }
}