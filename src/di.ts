import { UserRepository } from "./domain/repositories/UserRepository";
import { SQLClient } from "./application/services/database/SQLClient";
import { AuthService } from "./application/services/auth";
import { initDb } from "./infra/supabase";
import { UserLifestyleRepository } from "./domain/repositories/UserLifestyleRepository";

initDb();

// SERVICES ----------------------------------------------------------
export const sqlClient = new SQLClient();
export const authService = new AuthService();


// REPOSITORIES -------------------------------------------------------
export const userRepository = new UserRepository(sqlClient);
export const userLifestyleRepository = new UserLifestyleRepository(sqlClient);


