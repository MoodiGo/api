import { SQLClient } from "../../application/services/database/SQLClient";
import { DatabaseInsertError, DatabaseUpdateError } from "../../shared/errors/database";
import { User } from "../entities/User";
import { UserVibe } from "../entities/UserVibe";
import { PostUserVibeRequest } from "../use-cases/PostUserVibe";
import { PostUserWeatherRequest } from "../use-cases/PostUserWeather";

export interface IUserVibeRepository {
    upsert(user: User, data: PostUserVibeRequest): Promise<void>;
}

export class UserVibeRepository implements IUserVibeRepository {
    private dbClient: SQLClient;
    /**
     *
     */
    constructor(client: SQLClient) {
        this.dbClient = client;
    }

    private userVibeTable = "user_vibes";

    async #get(vibe_id: string, user_id: string) : Promise<UserVibe | null> {
        try {
            const params = [user_id, vibe_id];
            const result = await this.dbClient.queryAll<UserVibe>(this.userVibeTable, ["user_id"], params);
            if (result.length === 0) {
                return null;
            }
            return result[0] as UserVibe;
        } catch (error) {
            throw new Error("Error getting user-vibe data: " + error);
        }
    }
    
    async upsert(user: User, data: PostUserVibeRequest) : Promise<void> {
        let action : 'create' | 'update' | undefined = undefined;
        try {
            // Check if the user already has a weather record with the same weather_id
            const existing = await this.#get(data.vibe_id, user.id);

            if(existing) {
                action = 'update';
                // If the weather record already exists, update it instead of creating a new one
                const parsedExistingTimesChosen = parseInt(existing.times_chosen.toString(), 10);
                const parsedNewTimesChosen = parseInt(data.times_chosen.toString(), 10);

                const existingWeatherTimesChosen = isNaN(parsedExistingTimesChosen) ? 0 : parsedExistingTimesChosen;
                const newWeatherTimesChosen = isNaN(parsedNewTimesChosen) ? 0 : parsedNewTimesChosen;

                const updatedData = {
                    ...data,
                    times_chosen: existingWeatherTimesChosen + newWeatherTimesChosen
                }
                return this.#update(updatedData, user);
            }

            action = 'create';
            // If the weather record does not exist, create a new one
            return this.#create(user, data);
        } catch (error) {
            if(error instanceof DatabaseInsertError || error instanceof DatabaseUpdateError) {
                throw error;
            }
            throw new Error(`Error on ${action} user-vibe: ` + error);
        }
    }

    async #create(user: User, data: PostUserVibeRequest) : Promise<void> {
        try {
            const params = [user.id, data.vibe_id, data.times_chosen, data.self_declared];
            await this.dbClient.insert(this.userVibeTable, params);
        } catch (error) {
            throw new Error("Table: user_vibes - Error: " + error);
        }
    }

    async #update(data: PostUserVibeRequest, user: User) : Promise<void> {
        try {
            const params = [user.id, data.vibe_id];
            await this.dbClient.update(this.userVibeTable, data, ["user_id", "vibe_id"], params);
        } catch (error) {
            throw new Error("Table: user_vibes - Error: " + error);
        }
    }
}