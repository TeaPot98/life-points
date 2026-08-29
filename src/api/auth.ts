import { supabase } from "./supabase";

const auth = {
  async signUpWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async signInWithPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default auth;
