import { userRepository, userWeatherRepository } from "../../../di";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { Request, Response } from 'express';
import { ControllerBase } from "./ControllerBase";
import { UserDoesNotExistError } from "../../../shared/errors/user";
import { PostUserWeatherRequest } from "../../../domain/use-cases/PostUserWeather";
import { UserWeatherRepository } from "../../../domain/repositories/UserWeatherRepository";

export class UserWeatherController extends ControllerBase {
    private userRepository:UserRepository;
    private userWeatherRepository:UserWeatherRepository;

    constructor() {
        super();
        this.userRepository = userRepository;
        this.userWeatherRepository = userWeatherRepository
    }

    async createUserWeather(req: Request, res: Response) {
        try {
            if(!this.validateBodyPresence(req.body)) return this.sendErrorInvalidBody(res, PostUserWeatherRequest.getSchema());    

            if(!req.user || !req.user.uid) return this.sendError(res, new Error(), "Could not set uid from token");

            const user = await this.userRepository.get(req.user.uid);
            if(!user.data) return this.sendError(res, new UserDoesNotExistError(), "User not found");

            await this.userWeatherRepository.upsert(user.data, req.body.weather_id);

            return this.send(res, 204, "User weather created");
        } catch (error) {
            return this.sendError(res, error, "Error creating user weather");
        }
    }
}