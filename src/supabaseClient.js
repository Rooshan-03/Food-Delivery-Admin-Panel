import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zkyttylzkfwbsauxwksx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpreXR0eWx6a2Z3YnNhdXh3a3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NjAyNjMsImV4cCI6MjA3MjIzNjI2M30.EdcJpFHwi3OuXxtJwpLQxa9V_-Wyp2ZwQqq6wUzUeks";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
