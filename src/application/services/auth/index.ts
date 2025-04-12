import { DecodedIdToken, getAuth } from "firebase-admin/auth";

interface IAuthService {
    validateToken (token: string): Promise<DecodedIdToken>;
}

export class AuthService implements IAuthService {
    async validateToken(token: string): Promise<DecodedIdToken> {
        // Validate the token using Firebase Admin SDK
        return await getAuth().verifyIdToken(token);
    }
}
