import { SelectUser } from "../../shared/types/db_types";
import { PostRequestBody } from "./models/PostRequestBody";

export class PutUserProfileRequest implements PostRequestBody<PutUserProfileRequest> {
    name?: string;
    lastName?: string;
    email?: string;
    isPremium?: boolean;
    lastLoginAt?: string;

    constructor(name?: string, lastName?: string, email?: string, isPremium?: boolean, lastLoginAt?: string) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.isPremium = isPremium;
        this.lastLoginAt = lastLoginAt;
    }
    
    static fromJson(json: any): PutUserProfileRequest {
        return new PutUserProfileRequest(
            json.name,
            json.lastName,
            json.email,
            json.isPremium,
            json.lastLoginAt,
        );
    }

    static getSchema() {
        return {
            type: "object",
            properties: {
                name: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                isPremium: { type: "boolean" },
                lastLoginAt: { type: "string" },
            },
            required: [],
        };
    }

    static validate(json: any): boolean {
        try {
            return this.fromJson(json) instanceof PutUserProfileRequest;
        } catch (error) {
            return false;            
        }
    }
}

export interface PutUserProfileResponse {
    user: SelectUser;
}