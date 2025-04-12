import { SQLClient } from "../../application/services/database/SQLClient";
import { DatabaseQueryError, DatabaseUpdateError } from "../../shared/errors/database";
import { UserAlreadyExistsError } from "../../shared/errors/user";
import { UserLifestyleAlreadyExistsError } from "../../shared/errors/user_lifestyle";
import { InsertUser, InsertUserLifestyle, SelectUser, SelectUserLifestyle, UpdateUser } from "../../shared/types/db_types";
import { Database } from "../../shared/types/supabase";
import { User } from "../entities/User";
import { GetUserProfileResponse } from "../use-cases/GetUserProfile";
import { FirebaseUserData, PostUserProfileRequest } from "../use-cases/PostUserProfile";
import { PutUserProfileRequest } from "../use-cases/PutUserProfile";

export interface IUserRepository {
    get(uid: string): Promise<GetUserProfileResponse>;
    create(data: PostUserProfileRequest, firebaseData: FirebaseUserData): Promise<SelectUser>;
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
                birthdate: data.birthDate,
                terms_accepted: data.termsAccepted,
                accepted_contact: data.contactAccepted,
                email: firebaseData.email,
                firebase_uid: firebaseData.firebase_uid,
            } as InsertUser;


            // Insert new user profile
            return await this.dbClient.insert<InsertUser, SelectUser>(this.tableName, dataToInsert);
        } catch (error) {
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
}
