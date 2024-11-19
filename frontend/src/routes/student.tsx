import { Tables } from "@/backend/database.types";
import { getToken, removeToken } from "@/backend/jtw-storage";
import { supabase } from "@/backend/supabase-client";
import StudentPage from "@/pages/student-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/student")({
  loader: async () => {
    const token = getToken();

    // If no token, redirect to home page
    if (!token) {
      throw redirect({ to: "/" });
    }

    try {
      const { data, error } = await supabase.rpc("get_user_profile", {
        _refresh_token: token,
      });
      const { data: subjects } = await supabase.from("subjects").select("*");
      const { data: colleges } = await supabase.from("colleges").select("*");

      // If error or no data, remove token and redirect
      if (error || !data || data.length === 0) {
        removeToken();
        throw redirect({ to: "/" });
      }

      return { data, subjects, colleges };
    } catch (err) {
      // Handle any other errors
      removeToken();
      throw redirect({ to: "/" });
    }
  },
  component: () => {
    const { data, subjects, colleges } = Route.useLoaderData();
    return data && data[0] ? (
      <StudentPage
        user={data[0] as Tables<"users">}
        subjects={subjects || []}
        colleges={colleges || []}
      />
    ) : (
      redirect({ to: "/" })
    );
  },
});
