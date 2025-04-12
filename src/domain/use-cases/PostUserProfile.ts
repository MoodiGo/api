import { DecodedIdToken } from "firebase-admin/auth";

export class PostUserProfileRequest {
    constructor(
        public readonly name : string,
        public readonly lastName : string,
        public readonly birthDate : string,
        public readonly isPremium : boolean,
        public readonly termsAccepted : boolean,
        public readonly contactAccepted : boolean,
    ) {}

    // from json
    static fromJson(json: any): PostUserProfileRequest {
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