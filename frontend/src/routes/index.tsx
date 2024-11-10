import { getToken } from '@/backend/jtw-storage';
import LoginPage from '@/pages/login-page'
import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute("/")({
  loader: async () => {
    const token = getToken();

    // If no token, redirect to home page
    if (token) {
      throw redirect({ to: "/dashboard" });
    }
  },

  component: () => {
    return LoginPage();
  },
});
