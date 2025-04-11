import { DecodedIdToken, getAuth } from "firebase-admin/auth";

interface IAuthService {
    login(username: string, password: string): Promise<string>;
    logout(): Promise<void>;
    register(username: string, password: string): Promise<string>;

    validateToken (token: string): Promise<DecodedIdToken>;
}

export class AuthService implements IAuthService {
    async login(username: string, password: string): Promise<string> {
        // Simulate login logic
        if (username === "test" && password === "password") {
            return "Login successful";
        }
        throw new Error("Invalid username or password");
    }

    async logout(): Promise<void> {
        // Simulate logout logic
        console.log("User logged out");
    }

    async register(username: string, password: string): Promise<string> {
        // Simulate registration logic
        if (username && password) {
            return "Registration successful";
        }
        throw new Error("Invalid registration details");
    }

    async validateToken(token: string): Promise<DecodedIdToken> {
        // Validate the token using Firebase Admin SDK
        return await getAuth().verifyIdToken(token);
    }
}
