import { createClient, SupabaseClient } from '@supabase/supabase-js';


export let supabase : SupabaseClient|null = null;

export const initSupabase = () : void => {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const sb = createClient(supabaseUrl, supabaseKey);

    supabase = sb;
}

export const getSupabase = () : SupabaseClient => {
    if(!supabase) {
        throw new Error("Supabase not initialized.");
    }
    return supabase;
}