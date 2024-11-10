import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendEmail } from "@/services/email-service";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resetUrl = `${window.location.origin}/reset-password/${values.email}`;

    const promise = sendEmail({
      to: values.email,
      url: resetUrl,
    }).then(() => {
      navigate({ to: "/" });
    });

    toast.promise(promise, {
      loading: "Sending reset link...",
      success: "Password reset link sent to your email",
      error: "Failed to send reset email",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#e9ecef]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/" })}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
