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
      fan_preferences: {
        Row: {
          created_at: string
          fan_id: string
          favorite_team: string
          id: string
        }
        Insert: {
          created_at?: string
          fan_id: string
          favorite_team: string
          id?: string
        }
        Update: {
          created_at?: string
          fan_id?: string
          favorite_team?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fan_preferences_fan_id_fkey"
            columns: ["fan_id"]
            isOneToOne: false
            referencedRelation: "fans"
            referencedColumns: ["id"]
          },
        ]
      }
      fan_tickets: {
        Row: {
          away_team: string
          fan_id: string
          home_team: string
          id: string
          match_id: number
          purchase_date: string
          ticket_price: number
        }
        Insert: {
          away_team: string
          fan_id: string
          home_team: string
          id?: string
          match_id: number
          purchase_date?: string
          ticket_price: number
        }
        Update: {
          away_team?: string
          fan_id?: string
          home_team?: string
          id?: string
          match_id?: number
          purchase_date?: string
          ticket_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "fan_tickets_fan_id_fkey"
            columns: ["fan_id"]
            isOneToOne: false
            referencedRelation: "fans"
            referencedColumns: ["id"]
          },
        ]
      }
      fans: {
        Row: {
          created_at: string
          favorite_team: string
          id: string
          id_number: string
          mobile: string
          name: string
        }
        Insert: {
          created_at?: string
          favorite_team: string
          id: string
          id_number: string
          mobile: string
          name: string
        }
        Update: {
          created_at?: string
          favorite_team?: string
          id?: string
          id_number?: string
          mobile?: string
          name?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          email: string
          id: string
          mobile: string
          registration_number: string
          team_name: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          mobile: string
          registration_number: string
          team_name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          mobile?: string
          registration_number?: string
          team_name?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
