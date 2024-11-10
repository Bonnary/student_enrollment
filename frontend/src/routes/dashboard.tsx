import { getToken } from "@/backend/jtw-storage";
import { supabase } from "@/backend/supabase-client";
import DashboardPage from "@/pages/dashboard-page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Tables } from "@/backend/database.types";

export const Route = createFileRoute("/dashboard")({
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
    return data && data[0] ? (
      <DashboardPage user={data[0] as Tables<"users">} />
    ) : (
      redirect({ to: "/" })
    );
  },
});
