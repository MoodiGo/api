import { SQLClient } from "../../application/services/database/SQLClient";
import { UserLifestyleAlreadyExistsError } from "../../shared/errors/user_lifestyle";
import { InsertUserLifestyle, SelectUser, SelectUserLifestyle, UpdateUserLifestyle } from "../../shared/types/db_types";
import { User } from "../entities/User";
import { PutUserLifestyleRequest } from "../use-cases/PutUserLifestyle";

/**
 * UserLifestyleRepository interface
 * 
 * This interface defines the methods for managing user lifestyle data in the database.
 * It includes methods for creating, deleting, getting, and updating user lifestyle records.
 */
export interface IUserLifestyleRepository {
    create(user: User): Promise<SelectUserLifestyle>;
    delete(uid: string): Promise<void>;
    get(uid: string): Promise<SelectUserLifestyle | null>;
    update(data: PutUserLifestyleRequest, user: User): Promise<SelectUserLifestyle>;
}





/**
 * UserLifestyleRepository class
 * 
 * This class is responsible for managing user lifestyle data in the database.
 * It provides methods to create, delete, get, and update user lifestyle records.
 * 
 * @class UserLifestyleRepository
 * @implements {IUserLifestyleRepository}
 * @constructor
 * @param {SQLClient} dbClient - The database client used to interact with the database.
 */
export class UserLifestyleRepository implements IUserLifestyleRepository {
    private dbClient: SQLClient;

    private readonly tableName = "user_lifestyles";

    /**
     * Constructor for UserLifestyleRepository.
     * 
     * @param {SQLClient} dbClient - The database client used to interact with the database.
     */
    constructor(dbClient: SQLClient) {
        this.dbClient = dbClient;
    }

    /**
     * Get a user lifestyle by user ID.
     * 
     * @param {string} user_id - The ID of the user.
     * @returns {Promise<SelectUserLifestyle | null>} - The user lifestyle data or null if not found.
     */
    get = async (user_id: string): Promise<SelectUserLifestyle | null> => {
        const params = [user_id];
        const result = await this.dbClient.queryAll(this.tableName, ["user_id"], params);
        if (result.length === 0) {
            return null;
        }
        return result[0] as SelectUserLifestyle;
    }

    
    /**
     * Create a new user lifestyle record.
     * 
     * @param {SelectUser} user - The user data.
     * @returns {Promise<SelectUserLifestyle>} - The created user lifestyle data.
     */
    create = async (user: User|SelectUser): Promise<SelectUserLifestyle> => {
        try {
            const params = [user.id];

            const resultLS = await this.dbClient.queryAll(this.tableName, ["user_id"] , params);

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


    /**
     * Delete a user lifestyle record by user ID.
     * 
     * @param {string} userId - The ID of the user.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    delete = async (userId: string): Promise<void> => {
        const params = [userId];
        const result = await this.dbClient.delete(this.tableName, "user_id", params);
        if (!result) {
            throw new Error("Error deleting user lifestyle");
        }
    }

    
    /**
     * Update a user lifestyle record.
     * 
     * @param {PutUserLifestyleRequest} data - The data to update.
     * @param {SelectUser} user - The user data.
     * @returns {Promise<SelectUserLifestyle>} - The updated user lifestyle data.
     */
    update = async (data: PutUserLifestyleRequest, user: User): Promise<SelectUserLifestyle> => {
        try{
            let existingData = await this.get(user.id);

            if(existingData === null) {
                existingData = await this.create(user);
            }

            const isNotEmpty = (key: keyof PutUserLifestyleRequest) => {
                const parsed = parseInt(data[key] as unknown as string, 10);
                if(isNaN(parsed)) {
                    return false;
                }
                return data[key] !== undefined && data[key] !== null && parsed > 0;
            }

            const getNewValue = (key: keyof PutUserLifestyleRequest) => {
                const existingDataKey = key as keyof SelectUserLifestyle;


                if (isNotEmpty(key)) {
                    const parsedNewData = parseInt(data[key] as unknown as string, 10);
                    const parsedExistingData = parseInt(existingData![existingDataKey] as unknown as string, 10);

                    if (isNaN(parsedNewData) || isNaN(parsedExistingData)) {
                        return existingData![existingDataKey] || 0;
                    }

                    return parsedNewData + parsedExistingData;
                }
                return (existingData![existingDataKey] as number) || 0;
            }

            const updateData = {
                updated_at: new Date().toISOString(),
                favorited_alcohol: getNewValue("favorited_alcohol"),
                favorited_takeout: getNewValue("favorited_takeout"),
                favorited_dinein: getNewValue("favorited_dinein"),
                favorited_nightclub: getNewValue("favorited_nightclub"),
                favorited_cafe: getNewValue("favorited_cafe"),
                favorited_casino: getNewValue("favorited_casino"),
                favorited_church: getNewValue("favorited_church"),
                favorited_zoo_aquarium: getNewValue("favorited_zoo_aquarium"),
                favorited_spa_and_beauty: getNewValue("favorited_spa_and_beauty"),
                favorited_shoppingmall: getNewValue("favorited_shoppingmall"),
                favorited_museum: getNewValue("favorited_museum"),
                favorited_delivery: getNewValue("favorited_delivery"),
                favorited_amusement_park: getNewValue("favorited_amusement_park"),
                favorited_nature: getNewValue("favorited_nature"),
                favorited_book_store: getNewValue("favorited_book_store"),
                filter_children: getNewValue("filter_children"),
                filter_pets: getNewValue("filter_pets"),
                filter_groups: getNewValue("filter_groups"),
                filter_duos: getNewValue("filter_duos"),
                filter_solos: getNewValue("filter_solos"),
                filter_accessible_places: getNewValue("filter_accessible_places"),
            } as UpdateUserLifestyle;

            const params = [user.id];

            const result = await this.dbClient.update<UpdateUserLifestyle, SelectUserLifestyle>(this.tableName, updateData, ["user_id"], params);

            if (!result) {
                throw new Error("Error updating user lifestyle");
            }
            return result;
        }catch (error) {
            throw new Error("Error updating user lifestyle");
        }
    }
}