import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const createMockClient = () => {
  return {
    from: (table: string) => ({
      insert: async (data: any) => {
        // Yapay bir gecikme ekleyelim
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { data: null, error: null };
      },
      select: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
      })
    })
  } as any;
};

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

