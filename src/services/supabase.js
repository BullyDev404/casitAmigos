import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfsinjqxmcnrexdeordq.supabase.co";
const supabaseKey = "sb_publishable_Aymljhaaf5RX6rKaQnsguQ_uJn9dxDP";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
