import { Database as GeneratedDatabase } from '@/lib/database.types';

export type TestBooking = Database['public']['Tables']['test_bookings']['Row'];

export interface Database extends GeneratedDatabase {
  public: {
    Tables: {
      test_bookings: {
        Row: {
          id: string;
          property_id: string;
          user_id: string;
          start_date: string;
          end_date: string;
          total_price: number;
          team_size: number;
          status: string;
          payment_status: string;
          payment_reference: string;
          notes: string | null;
          is_test: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<TestBooking, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<TestBooking, 'id' | 'created_at' | 'updated_at'>> & {
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          property_type: string;
          address: string;
          description: string;
          price: number;
          price_type: string;
          country: string;
          state: string;
          city: string;
          neighborhood: string | null;
          max_guests: number;
          damage_deposit: number | null;
          owner_id: string;
          is_verified: boolean;
          is_published: boolean;
          is_featured: boolean;
          zip_code: string | null;
          has_office_space: boolean;
          rules: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>> & {
          updated_at?: string;
        };
      };
    };
  };
}
