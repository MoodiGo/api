import { userRepository, userVibeRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { Request, Response } from 'express';
import { ControllerBase } from "./ControllerBase";
import { UserDoesNotExistError } from "../../../shared/errors/user";
import { UserVibeRepository } from "../../../domain/repositories/UserVibeRepository";
import { PostUserVibeRequest } from "../../../domain/use-cases/PostUserVibe";

export class UserVibeController extends ControllerBase {
    private userRepository:UserRepository;
    private userVibeRepository:UserVibeRepository;

    constructor() {
        super();
        this.userRepository = userRepository;
        this.userVibeRepository = userVibeRepository;
    }

    async createUserVibe(req: Request, res: Response) {
        try {
            if(!this.validateBodyPresence(req.body)) return this.sendErrorInvalidBody(res, PostUserVibeRequest.getSchema());    

            if(!req.user || !req.user.uid) return this.sendError(res, new Error(), "Could not set uid from token");

            const user = await this.userRepository.get(req.user.uid);
            if(!user.data) return this.sendError(res, new UserDoesNotExistError(), "User not found");

            await this.userVibeRepository.upsert(user.data, req.body as PostUserVibeRequest);

            return this.send(res, 204, "User vibe created");
        } catch (error) {
            return this.sendError(res, error, "Error creating user vibe");
        }
    }
}