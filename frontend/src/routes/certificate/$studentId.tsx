import { supabase } from "@/backend/supabase-client";
import Certificate from "@/pages/certificate";
import {
  createFileRoute,
} from "@tanstack/react-router";

import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/certificate/$studentId")({
  loader: async ({ params }) => {
    try {
      const { data } = await supabase.rpc("get_student_by_id", {
        p_id: +params.studentId,
      });

      if (!data || data.length === 0) {
        throw new Error("Student not found");
      }

      return { student: data[0] };
    } catch (error) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <App />,
});

function App() {
  const { student } = Route.useLoaderData();
  return <Certificate student={student} />;
}