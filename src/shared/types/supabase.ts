export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          filter_accessible: boolean
          filter_amount_people: boolean
          filter_best_period: string | null
          filter_child_friendly: boolean
          filter_google_location_id: string
          filter_pet_friendly: boolean
          filter_vibe_id: number | null
          filter_weather_id: number | null
          google_place_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          filter_accessible: boolean
          filter_amount_people: boolean
          filter_best_period?: string | null
          filter_child_friendly: boolean
          filter_google_location_id: string
          filter_pet_friendly: boolean
          filter_vibe_id?: number | null
          filter_weather_id?: number | null
          google_place_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          filter_accessible?: boolean
          filter_amount_people?: boolean
          filter_best_period?: string | null
          filter_child_friendly?: boolean
          filter_google_location_id?: string
          filter_pet_friendly?: boolean
          filter_vibe_id?: number | null
          filter_weather_id?: number | null
          google_place_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Favorite_filter_vibe_id_fkey"
            columns: ["filter_vibe_id"]
            isOneToOne: false
            referencedRelation: "vibes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Favorite_filter_weather_id_fkey"
            columns: ["filter_weather_id"]
            isOneToOne: false
            referencedRelation: "weathers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Favorite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lifestyles: {
        Row: {
          created_at: string
          favorited_alcohol: number
          favorited_amusement_park: number
          favorited_book_store: number
          favorited_cafe: number
          favorited_casino: number
          favorited_church: number
          favorited_delivery: number
          favorited_dinein: number
          favorited_museum: number
          favorited_nature: number
          favorited_nightclub: number
          favorited_shoppingmall: number
          favorited_spa_and_beauty: number
          favorited_takeout: number
          favorited_zoo_aquarium: number
          filter_accessible_places: number
          filter_children: number
          filter_duos: number
          filter_groups: number
          filter_pets: number
          filter_solos: number
          id: string
          most_used_user_location_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          favorited_alcohol?: number
          favorited_amusement_park?: number
          favorited_book_store?: number
          favorited_cafe?: number
          favorited_casino?: number
          favorited_church?: number
          favorited_delivery?: number
          favorited_dinein?: number
          favorited_museum?: number
          favorited_nature?: number
          favorited_nightclub?: number
          favorited_shoppingmall?: number
          favorited_spa_and_beauty?: number
          favorited_takeout?: number
          favorited_zoo_aquarium?: number
          filter_accessible_places?: number
          filter_children?: number
          filter_duos?: number
          filter_groups?: number
          filter_pets?: number
          filter_solos?: number
          id?: string
          most_used_user_location_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          favorited_alcohol?: number
          favorited_amusement_park?: number
          favorited_book_store?: number
          favorited_cafe?: number
          favorited_casino?: number
          favorited_church?: number
          favorited_delivery?: number
          favorited_dinein?: number
          favorited_museum?: number
          favorited_nature?: number
          favorited_nightclub?: number
          favorited_shoppingmall?: number
          favorited_spa_and_beauty?: number
          favorited_takeout?: number
          favorited_zoo_aquarium?: number
          filter_accessible_places?: number
          filter_children?: number
          filter_duos?: number
          filter_groups?: number
          filter_pets?: number
          filter_solos?: number
          id?: string
          most_used_user_location_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserLifestyle_most_used_user_location_id_fkey"
            columns: ["most_used_user_location_id"]
            isOneToOne: false
            referencedRelation: "user_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserLifestyle_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_locations: {
        Row: {
          created_at: string
          google_location_id: string
          id: string
          self_declared: boolean
          times_chosen: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at: string
          google_location_id: string
          id?: string
          self_declared: boolean
          times_chosen?: number
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          google_location_id?: string
          id?: string
          self_declared?: boolean
          times_chosen?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserLocation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vibes: {
        Row: {
          created_at: string
          id: string
          self_declared: boolean
          times_chosen: number
          user_id: string
          vibe_id: number
        }
        Insert: {
          created_at: string
          id?: string
          self_declared?: boolean
          times_chosen: number
          user_id: string
          vibe_id: number
        }
        Update: {
          created_at?: string
          id?: string
          self_declared?: boolean
          times_chosen?: number
          user_id?: string
          vibe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserVibe_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserVibe_vibe_id_fkey"
            columns: ["vibe_id"]
            isOneToOne: false
            referencedRelation: "vibes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_weathers: {
        Row: {
          created_at: string
          id: string
          self_declared: boolean
          times_chosen: number
          user_id: string
          weather_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          self_declared?: boolean
          times_chosen: number
          user_id: string
          weather_id: number
        }
        Update: {
          created_at?: string
          id?: string
          self_declared?: boolean
          times_chosen?: number
          user_id?: string
          weather_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserWeather_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserWeather_weather_id_fkey"
            columns: ["weather_id"]
            isOneToOne: false
            referencedRelation: "weathers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          accepted_contact: boolean
          birthdate: string
          created_at: string
          email: string
          firebase_uid: string
          id: string
          is_premium: boolean
          last_login_at: string | null
          last_name: string
          login_provider_id: string
          name: string
          terms_accepted: boolean
          updated_at: string
        }
        Insert: {
          accepted_contact: boolean
          birthdate: string
          created_at?: string
          email: string
          firebase_uid: string
          id?: string
          is_premium: boolean
          last_login_at?: string | null
          last_name: string
          login_provider_id: string
          name: string
          terms_accepted: boolean
          updated_at?: string
        }
        Update: {
          accepted_contact?: boolean
          birthdate?: string
          created_at?: string
          email?: string
          firebase_uid?: string
          id?: string
          is_premium?: boolean
          last_login_at?: string | null
          last_name?: string
          login_provider_id?: string
          name?: string
          terms_accepted?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      vibes: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      weathers: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
