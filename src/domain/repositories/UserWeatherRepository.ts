import { SQLClient } from "../../application/services/database/SQLClient";
import { DatabaseInsertError, DatabaseUpdateError } from "../../shared/errors/database";
import { User } from "../entities/User";
import { UserWeather } from "../entities/UserWeather";
import { PostUserWeatherRequest } from "../use-cases/PostUserWeather";

export interface IUserWeatherRepository {
    upsert(user: User, data: PostUserWeatherRequest): Promise<void>;
}

export class UserWeatherRepository implements IUserWeatherRepository {
    private dbClient: SQLClient;
    /**
     *
     */
    constructor(client: SQLClient) {
        this.dbClient = client;
    }

    async #get(weather_id: string, user_id: string) : Promise<UserWeather | null> {
        try {
            const params = [user_id, weather_id];
            const result = await this.dbClient.queryAll<UserWeather>("user_weather", ["user_id"], params);
            if (result.length === 0) {
                return null;
            }
            return result[0] as UserWeather;
        } catch (error) {
            throw new Error("Error getting user weather data: " + error);
        }
    }
    
    async upsert(user: User, data: PostUserWeatherRequest) : Promise<void> {
        let action : 'create' | 'update' | undefined = undefined;
        try {
            // Check if the user already has a weather record with the same weather_id
            const existingWeather = await this.#get(data.weather_id, user.id);

            if(existingWeather) {
                action = 'update';
                // If the weather record already exists, update it instead of creating a new one
                const parsedExistingTimesChosen = parseInt(existingWeather.times_chosen.toString(), 10);
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
            throw new Error(`Error on ${action} user weather: ` + error);
        }
    }

    async #create(user: User, data: PostUserWeatherRequest) : Promise<void> {
        try {
            const params = [user.id, data.weather_id, data.times_chosen, data.self_declared];
            await this.dbClient.insert("user_weather", params);
        } catch (error) {
            throw new Error("Table: user_weather - Error: " + error);
        }
    }

    async #update(data: PostUserWeatherRequest, user: User) : Promise<void> {
        try {
            const params = [user.id, data.weather_id];
            await this.dbClient.update("user_weather", data, ["user_id", "weather_id"], params);
        } catch (error) {
            throw new Error("Table: user_weather - Error: " + error);
        }
    }
}