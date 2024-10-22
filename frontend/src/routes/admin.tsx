import { supabase } from "@/backend/supabase-client";
import AdminPage from "@/pages/admin-page";
import { User } from "@supabase/supabase-js";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return { user };
  },
  component: () => {
    const { user } = Route.useLoaderData();
    return user ? AdminPage({ user }) : redirect({ to: "/" });
  },
});
