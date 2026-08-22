import { supabase } from "./supabase";

const auth = {
  signUpWithPassword(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },
  signInWithPassword(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },
};

export default auth;
