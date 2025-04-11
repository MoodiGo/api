import { SupabaseClient } from "@supabase/supabase-js";
import { DatabaseQueryError } from "../../../shared/errors/database";

export interface ISQLClient {
    query<T> (query: string, params?: any[]) : Promise<T[]>;
    queryOne<T> (query: string, params?: any[]) : Promise<T|null>;
}

export class SQLClient implements ISQLClient {
    private client: SupabaseClient;

    constructor(client: any) {
        this.client = client;
    }

    async query<T>(query: string, params?: any[]): Promise<T[]> {
        const { data, error } = await this.client.rpc(query, params);

        if (error) {
            throw new DatabaseQueryError(`Query: ${query} - Error: ${error.message}`);
        }

        return data as T[];
    }

    async queryOne<T>(query: string, params?: any[]): Promise<T | null> {
        const { data, error } = await this.client.rpc(query, params);

        if (error) {
            throw new DatabaseQueryError(`Query: ${query} - Error: ${error.message}`);
        }

        return data ? (data[0] as T) : null;
    }
}