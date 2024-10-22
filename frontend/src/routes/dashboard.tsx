import { supabase } from "@/backend/supabase-client";
import DashboardPage from "@/pages/dashboard-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  loader: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { user };
  },
  component: () => {
    const { user } = Route.useLoaderData();
    return user ? DashboardPage({ user }) : redirect({ to: "/" });
  },
});
