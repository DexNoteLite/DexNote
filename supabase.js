// supabase.js

const SUPABASE_URL = "https://hbcagtskbcmnxuataktf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_W67hDSKZt8FijqHI_s-6oQ_TIaEOp3u";

window.supabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
