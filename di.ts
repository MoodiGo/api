import { UserRepository } from "./src/domain/repositories/UserRepository";
import { supabase } from "./src/infra/supabase";
import { SQLClient } from "./src/application/services/database/SQLClient";
import { AuthService } from "./src/application/services/auth";

const sqlClient = new SQLClient({supabase});

export const userRepository = new UserRepository(sqlClient);

export const authService = new AuthService();
