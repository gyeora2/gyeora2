import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mqjouyxwntjcrryqxrum.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_nre65PNRgv1TjoCvHLd6jA_GV1OBYRJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);