import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://oafjzglwgovmalykvfpp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZmp6Z2x3Z292bWFseWt2ZnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODQwNzYsImV4cCI6MjA3ODg2MDA3Nn0.IWKNHA0icJjQADgJ8ghFSPEAeG7FG5CmNJBMMX2D1HY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
