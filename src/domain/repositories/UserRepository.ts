import { SQLClient } from "../../application/services/database/SQLClient";
import { UserAlreadyExistsError } from "../../shared/errors/user";
import { Database } from "../../shared/types/supabase";
import { User } from "../entities/User";
import { GetUserProfileResponse } from "../use-cases/GetUserProfile";
import { FirebaseUserData, PostUserProfileRequest } from "../use-cases/PostUserProfile";

export interface IUserRepository {
    getUserProfile(uid: string): Promise<GetUserProfileResponse>;
}

export class UserRepository implements IUserRepository {
    private dbClient: SQLClient;

    private readonly tableName = "users";

    constructor(dbClient: SQLClient) {
        this.dbClient = dbClient;
    }

    getUserProfile = async (uid: string): Promise<GetUserProfileResponse> => {
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

    createUserProfile = async (data: PostUserProfileRequest, firebaseData: FirebaseUserData): Promise<void> => {
        try {
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

            // Check if user already exists
            const existingUser = await this.getUserProfile(firebaseData.firebase_uid);

            if (existingUser.data) {
                throw new UserAlreadyExistsError("User already exists");
            }

            // Insert new user profile
            await this.dbClient.insert<InsertUser>(this.tableName, dataToInsert);
        } catch (error) {
            if(error instanceof UserAlreadyExistsError) {
                throw error;
            }

            throw new Error("Error creating user profile");
        }
    }
}

export type InsertUser = Database['public']['Tables']['users']['Insert'];
export type UpdateUser = Database['public']['Tables']['users']['Update'];
export type SelectUser = Database['public']['Tables']['users']['Row'];
export type RelationshipsUser = Database['public']['Tables']['users']['Relationships'];