import { SQLClient } from "../../application/services/database/SQLClient";
import { userLifestyleRepository } from "../../di";
import { BaseError } from "../../shared/errors/BaseError";
import { DatabaseQueryError, DatabaseUpdateError } from "../../shared/errors/database";
import { UserAlreadyExistsError, UserDoesNotExistError } from "../../shared/errors/user";
import { InsertUser, SelectUser, UpdateUser } from "../../shared/types/db_types";
import { User } from "../entities/User";
import { GetUserProfileResponse } from "../use-cases/GetUserProfile";
import { FirebaseUserData, PostUserProfileRequest } from "../use-cases/PostUserProfile";
import { PutUserProfileRequest } from "../use-cases/PutUserProfile";

export interface IUserRepository {
    get(uid: string): Promise<GetUserProfileResponse>;
    create(data: PostUserProfileRequest, firebaseData: FirebaseUserData): Promise<SelectUser>;
    update(data: PutUserProfileRequest, firebase_uid: string): Promise<SelectUser>;
    delete(firebase_uid: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
    private dbClient: SQLClient;

    private readonly tableName = "users";

    constructor(dbClient: SQLClient) {
        this.dbClient = dbClient;
    }

    get = async (uid: string): Promise<GetUserProfileResponse> => {
        const params = [uid];
        const result = await this.dbClient.queryOne<User>(this.tableName, "firebase_uid", params);
        
        if (result) {
            return {
                data: result 
            } as GetUserProfileResponse;
        }

        return {
            data: null
        } as unknown as GetUserProfileResponse;
    }

    create = async (data: PostUserProfileRequest, firebaseData: FirebaseUserData): Promise<SelectUser> => {
        try {
            // Check if user already exists
            const existingUser = await this.get(firebaseData.firebase_uid);

            if (existingUser.data) {
                throw new UserAlreadyExistsError();
            }

            
            const dataToInsert = {
                name: data.name,
                last_name: data.lastName,
                login_provider_id: firebaseData.firebase_provider,
                is_premium: data.isPremium,
                birthdate: data.birthdate,
                terms_accepted: data.termsAccepted,
                accepted_contact: data.contactAccepted,
                email: firebaseData.email,
                firebase_uid: firebaseData.firebase_uid,
            } as InsertUser;

            console.log("dataToInsert", dataToInsert);

            // Insert new user profile
            const insertResult = await this.dbClient.insert<InsertUser, SelectUser>(this.tableName, dataToInsert);
            if(!insertResult) {
                throw new Error("Error creating user profile");
            }
            return insertResult;
        } catch (error) {
            console.log(error);
            if(error instanceof UserAlreadyExistsError) {
                throw error;
            }

            throw new Error("Error creating user profile");
        }
    }

    update = async (data: PutUserProfileRequest, firebase_uid: string): Promise<SelectUser> => {
        try {
            const updateData = {} as UpdateUser;
            
            if (data.name) { updateData.name = data.name; }
            
            if (data.lastName) { updateData.last_name = data.lastName; }
            
            if (data.email) { updateData.email = data.email; }

            if (data.isPremium) { updateData.is_premium = data.isPremium; }

            const queryResponse = await this.dbClient.update<UpdateUser, SelectUser>(this.tableName, updateData, "firebase_uid = $1", [firebase_uid]);

            if (queryResponse) {
                return queryResponse;
            } else {
                throw new Error("Error updating user profile");
            }

        } catch (error) {
            if(error instanceof DatabaseUpdateError) {
                throw error;
            }
            throw new Error("Error updating user profile");
        }
    }

    delete = async (firebase_uid: string): Promise<void> => {
        try {
            const getUser = await this.get(firebase_uid);
            if (!getUser.data) {
                throw new UserDoesNotExistError();
            }

            const queryResponse = await this.dbClient.delete(this.tableName, "firebase_uid", [firebase_uid]);

            await userLifestyleRepository.delete(getUser.data.id);

            if (queryResponse) {
                throw new Error("Error deleting user profile: Failed to execute delete query");
            } else {
                throw new Error();
            }

        } catch (error) {
            if(error instanceof DatabaseQueryError || error instanceof BaseError) {
                throw error;
            }
            throw new Error("Error deleting user profile");
        }
    }
}
