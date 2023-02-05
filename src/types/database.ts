export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Todo: {
        Row: {
          description: string | null;
          id: string;
          title: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          title: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
