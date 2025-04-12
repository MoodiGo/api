import { DecodedIdToken } from "firebase-admin/auth";
import { SelectUser, SelectUserLifestyle } from "../../shared/types/db_types";
import { PostRequestBody } from "./models/PostRequestBody";

interface IPostUserProfileRequest {
    name: string;
    lastName: string;
    birthDate: string;
    isPremium: boolean;
    termsAccepted: boolean;
    contactAccepted: boolean;
}


export class PostUserProfileRequest implements PostRequestBody<IPostUserProfileRequest> {
    constructor(
        public readonly name : string,
        public readonly lastName : string,
        public readonly birthDate : string,
        public readonly isPremium : boolean,
        public readonly termsAccepted : boolean,
        public readonly contactAccepted : boolean,
    ) {}

    static fromJson(json: IPostUserProfileRequest): PostUserProfileRequest {
        return new PostUserProfileRequest(
            json.name,
            json.lastName,
            json.birthDate,
            json.isPremium,
            json.termsAccepted,
            json.contactAccepted
        );
    }

    static getSchema() {
        return {
            type: "object",
            properties: {
                name: { type: "string" },
                lastName: { type: "string" },
                birthDate: { type: "string" },
                isPremium: { type: "boolean" },
                termsAccepted: { type: "boolean" },
                contactAccepted: { type: "boolean" },
            },
            required: ["name", "lastName", "birthDate", "isPremium", "termsAccepted", "contactAccepted"],
        };
    }

    static validate(json: any): boolean {
        try {
            return this.fromJson(json) instanceof PostUserProfileRequest;
        } catch (error) {
            return false;            
        }
    }
}

export interface PostUserProfileResponse {
    user: SelectUser;
    lifestyle: SelectUserLifestyle;
}


export class FirebaseUserData {
    firebase_uid: string;
    email: string | undefined;
    firebase_provider: string;
   
    
    constructor(data: DecodedIdToken) {
        const {uid, email, firebase} = data;
        this.firebase_uid = uid;
        this.email = email;
        this.firebase_provider = firebase.sign_in_provider;
    }
}