import { SQLClient } from "../../application/services/database/SQLClient";
import { UserLifestyleAlreadyExistsError } from "../../shared/errors/user_lifestyle";
import { InsertUserLifestyle, SelectUser, SelectUserLifestyle } from "../../shared/types/db_types";

export interface IUserLifestyleRepository {
    // get(uid: string): Promise<GetUserLifestyleResponse>;
    create(user: SelectUser): Promise<SelectUserLifestyle>;
    // update(data: PutUserLifestyleRequest, uid: string): Promise<SelectUserLifestyle>;
    delete(uid: string): Promise<void>;
}

export class UserLifestyleRepository implements IUserLifestyleRepository {
    private dbClient: SQLClient;

    private readonly tableName = "user_lifestyles";

    constructor(dbClient: SQLClient) {
        this.dbClient = dbClient;
    }
    
    create = async (user: SelectUser): Promise<SelectUserLifestyle> => {
        try {
            const params = [user.id];

            const resultLS = await this.dbClient.queryAll(this.tableName, "user_id" , params);

            if (resultLS.length > 0) {
                throw new UserLifestyleAlreadyExistsError();
            }

            // Insert new user lifestyle
            const dataToInsert = {
                user_id: user.id,
                filter_children: 0,
                filter_pets: 0,
                filter_groups: 0,
                filter_duos: 0,
                filter_solos: 0,
                filter_accessible_places: 0,
                favorited_alcohol: 0,
                favorited_takeout: 0,
                favorited_amusement_park: 0,
                favorited_dinein: 0,
                favorited_nightclub: 0,
                favorited_cafe: 0,
                favorited_casino: 0,
                favorited_church: 0,
                favorited_zoo_aquarium: 0,
                favorited_spa_and_beauty: 0,
                favorited_shoppingmall: 0,
                favorited_museum: 0,
                favorited_delivery: 0,
                favorited_nature: 0,
                favorited_book_store: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                most_used_user_location_id: null,

            } as InsertUserLifestyle;


            const insertedRow = await this.dbClient.insert<InsertUserLifestyle, SelectUserLifestyle>(this.tableName, dataToInsert);
            if (!insertedRow) {
                throw new Error("Failed to insert user lifestyle");
            }
            return insertedRow;
        } catch (error) {
            if(error instanceof UserLifestyleAlreadyExistsError) {
                throw error;
            }
            throw new Error("Error creating user lifestyle");
        }
    }

    delete = async (userId: string): Promise<void> => {
        const params = [userId];
        const result = await this.dbClient.delete(this.tableName, "user_id", params);
        if (!result) {
            throw new Error("Error deleting user lifestyle");
        }
    }
}