import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase-client";
import { useNavigate } from "@tanstack/react-router";

export const logoutIfNotUser = async ({ user }: { user?: User }) => {
  const navaction = useNavigate();
  if (!user) {
    await supabase.auth.signOut();
    navaction({ to: "/" });
  }
};
