import { Tables } from "@/backend/database.types";
import { getToken } from "@/backend/jtw-storage";
import { supabase } from "@/backend/supabase-client";
import AdminPage from "@/pages/admin-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const token = getToken();

    // If no token, redirect to home page
    if (!token) {
      throw redirect({ to: "/" });
    }

    const { data } = await supabase.rpc("get_user_profile", {
      _refresh_token: token,
    });

    return { data };
  },
  component: () => {
    const { data } = Route.useLoaderData();
    return data![0].role_id === 1 ? AdminPage({ user: data![0] as Tables<"users"> }) : redirect({ to: "/" });
  },
});
