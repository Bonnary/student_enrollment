import ResetPasswordPage from "@/pages/reset-password-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reset-password/$email")({
  component: () => ResetPasswordPage(),
});
