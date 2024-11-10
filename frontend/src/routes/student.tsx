import { Tables } from "@/backend/database.types";
import { getToken } from "@/backend/jtw-storage";
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

    const { data } = await supabase.rpc("get_user_profile", {
      _refresh_token: token,
    });

    const { data: subjects } = await supabase.from("subjects").select("*");
    const { data: colleges } = await supabase.from("colleges").select("*");

    return { data, subjects, colleges };
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
