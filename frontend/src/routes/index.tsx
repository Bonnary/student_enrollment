import { supabase } from '@/backend/supabase-client';
import LoginPage from '@/pages/login-page'
import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute("/")({

  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return redirect({ to: "/dashboard" });
    }
  },

  component: () => {
    return LoginPage();
  },
});
