import { Pool } from "pg";
import { getDb } from "../../../infra/supabase";
import { DatabaseInsertError, DatabaseQueryError, DatabaseUpdateError } from "../../../shared/errors/database";

export interface ISQLClient {
  queryAll<T>(table: string, where?: string, params?: any[]): Promise<T[]>;
  queryOne<T>(table: string, where?: string, params?: any[]): Promise<T | null>;
  insert<T extends Record<string, any>>(table: string, data: T): Promise<T>;
}

export class SQLClient implements ISQLClient {
  private client: Pool;

  constructor() {
    this.client = getDb();
  }

  async queryAll<T>(table: string, where?: string, params?: any[]): Promise<T[]> {
    try {
      let query = `SELECT * FROM ${table}`;
      if (where && params?.length) {
        query += ` WHERE ${where} = $1`;
      }

      const result = await this.client.query(query, params || []);
      return result.rows as T[];
    } catch (error: any) {
      throw new DatabaseQueryError(`Query: ${table} - Error: ${error.message}`);
    }
  }

  async queryOne<T>(table: string, where?: string, params?: any[]): Promise<T | null> {
    try {
      let query = `SELECT * FROM ${table}`;
      if (where && params?.length) {
        query += ` WHERE ${where} = $1`;
      }
      query += " LIMIT 1";

      const result = await this.client.query(query, params || []);
      return result.rows[0] ?? null;
    } catch (error: any) {
      throw new DatabaseQueryError(`Query: ${table} - Error: ${error.message}`);
    }
  }

  async insert<T extends Record<string, any>, I>(table: string, data: T): Promise<I> {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

      const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders}) RETURNING *`;

      const result = await this.client.query(query, values);
      return result.rows[0] as I;
    } catch (error: any) {
      throw new DatabaseInsertError(`Insert: ${table} - Error: ${error.message}`);
    }
  }

  async update<T extends Record<string, any>, I>(table: string, data: T, where: string, params: any[]): Promise<I> {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const query = `UPDATE ${table} SET ${setClause} WHERE ${where}`;

      return await this.client.query(query, [...values, ...params]) as I;
    } catch (error: any) {
      throw new DatabaseUpdateError(`Update: ${table} - Error: ${error.message}`);
    }
  }
}
