import { userRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { FirebaseUserData, PostUserProfileRequest } from "../../../domain/use-cases/PostUserProfile";
import { Request, Response, NextFunction } from 'express';
import { UserAlreadyExistsError } from "../../../shared/errors/user";

export class UserController {
    private userRepository:UserRepository;
    constructor() {
        console.log("UserController constructor");
        this.userRepository = userRepository;
    }

    async getUserProfile(req: any, res: any) {
        // TODO - descomentar essa linha 
        // const uid = req.user?.uid;

        // TODO - descomentar essa linha e verificar se o uid existe
        // if (!uid) {
        //     return res.status(401).send({"message": "Unauthorized"});
        // }

        // TODO - substituir pelo uid do token

        this.userRepository.getUserProfile("9813jhsalknd219paskd").then((result) => {
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
        // TODO - descomentar essa linha 
        // const uid = req.user?.uid;

        // TODO - descomentar essa linha e verificar se o uid existe
        // if (!uid) {
            // return res.status(401).send({"message": "Unauthorized"});
        // }

        // TODO - substituir pelo uid do token
        if(req.body == null || req.body == undefined || !(req.body instanceof PostUserProfileRequest)){
            return res.status(406).send({
                message: "Invalid request body. Expected structure:",
                expected: PostUserProfileRequest.getSchema(),
            });
        }

        const firebaseUserData = new FirebaseUserData(req.user!);

        try {
            await this.userRepository.createUserProfile(req.body, firebaseUserData);
            return res.status(200).send({"message": "User created", "user": req.body});
        } catch (error) {
            if(error instanceof UserAlreadyExistsError) {
                return res.status(409).send({"message": "User already exists"});
            }else{
                return res.status(500).send({"message": "Internal server error"});
            }
        }
       
    }
}