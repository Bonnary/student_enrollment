import { supabase } from '@/backend/supabase-client';
import StudentPage from '@/pages/student-page'
import { User } from '@supabase/supabase-js';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/student")({
  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect({ to: "/" });
    }
  },
  component: ({ user }: { user: User }) => StudentPage({ user }),
});
