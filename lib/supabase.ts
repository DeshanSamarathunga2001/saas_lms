import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('=== SUPABASE DEBUG ===');
    console.log('URL:', supabaseUrl);
    console.log('KEY:', supabaseKey ? 'EXISTS' : 'MISSING');
    console.log('=====================');

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
    }

    const session = await auth();
    const token = await session.getToken();

    return createClient(
        supabaseUrl,
        supabaseKey,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    )
}