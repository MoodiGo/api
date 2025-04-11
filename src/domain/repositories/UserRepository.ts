import { SQLClient } from "../../application/services/database/SQLClient";
import { GetUserProfileResponse } from "../use-cases/GetUserProfile";

export interface IUserRepository {
    getUserProfile(uid: string): Promise<GetUserProfileResponse>;
}

export class UserRepository implements IUserRepository {
    private dbClient: SQLClient;

    constructor(dbClient: SQLClient) {
        this.dbClient = dbClient;
    }

    getUserProfile = async (uid: string): Promise<GetUserProfileResponse> => {

        return {
            user: null
        } as GetUserProfileResponse;
    }
}