import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { DatabaseInsertError, DatabaseQueryError } from "../../../shared/errors/database";
import { getSupabase } from "../../../infra/supabase";

export interface ISQLClient {
    queryAll<T> (table: string, where?: string, params?: any[]): Promise<T[]>;
    queryOne<T>(table: string, where?: string, params?: any[]): Promise<T | null>;
}   

export class SQLClient implements ISQLClient {
    private client: SupabaseClient;

    constructor() {
        this.client = getSupabase();
    }

    async queryOne<T>(table: string, where?: string, params?: any[]): Promise<T | null> {
        let res = {} as any;

        try{
            if(where && params) {
                res = await this.client.from(table).select("*").eq(where, params[0]);
            }else{
                res = await this.client.from(table).select("*");
            }   

            if(res.error) {
                throw new Error(res.error.message);
            }

            if(res.data.length === 0) {
                return null;
            }
            
            return res.data[0] as T;

        }catch (error : any) {
            throw new DatabaseQueryError(`Query: ${table} - Error: ${error.message}`);
        }
    }

    async queryAll<T>(table: string, where?: string, params?: any[]): Promise<T[]> {
        let res = {} as any;

        try{
            if(where && params) {
                res = await this.client.from(table).select("*").eq(where, params[0]);
            }else{
                res = await this.client.from(table).select("*");
            }   

            if(res.error) {
                throw new Error(res.error.message);
            }
            
            return res.data as T[];

        }catch (error : any) {
            throw new DatabaseQueryError(`Query: ${table} - Error: ${error.message}`);
        }
    }

    async insert<T>(table: string, data: T): Promise<T> {
        try{
            const res = await this.client.from(table).insert(data);

            if(res.error) {
                throw new Error(res.error.message);
            }

            if (res.data === null) {
                throw new DatabaseInsertError(`Insert: ${table} - Error: Insert operation returned null data.`);
            }

            return (res as PostgrestSingleResponse<T>).data as T;
        }catch (error : any) {
            throw new DatabaseInsertError(`Insert: ${table} - Error: ${error.message}`);
        }
    }
}