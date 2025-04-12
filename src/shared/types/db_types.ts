import { Database } from "./supabase";

export type InsertUser = Database['public']['Tables']['users']['Insert'];
export type UpdateUser = Database['public']['Tables']['users']['Update'];
export type SelectUser = Database['public']['Tables']['users']['Row'];
export type RelationshipsUser = Database['public']['Tables']['users']['Relationships'];

export type InsertUserLifestyle = Database['public']['Tables']['user_lifestyles']['Insert'];
export type UpdateUserLifestyle = Database['public']['Tables']['user_lifestyles']['Update'];
export type SelectUserLifestyle = Database['public']['Tables']['user_lifestyles']['Row'];
export type RelationshipsUserLifestyle = Database['public']['Tables']['user_lifestyles']['Relationships'];   