import { UserRepository } from "./domain/repositories/UserRepository";
import { SQLClient } from "./application/services/database/SQLClient";
import { AuthService } from "./application/services/auth";
import { initDb } from "./infra/supabase";


initDb();

const sqlClient = new SQLClient();

export const userRepository = new UserRepository(sqlClient);

export const authService = new AuthService();
