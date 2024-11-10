import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/backend/supabase-client";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";
import { refreshPage } from "@/backend/utility-function";
import { Tables } from "@/backend/database.types";

const formSchema = z.object({
  password: z.union([
    z.string().min(6, { message: "Password must be at least 6 characters" }),
    z.string().length(0),
  ]),
  full_name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  role: z.enum(["Admin", "Staff"], {
    required_error: "Please select a role",
  }),
});

export default function EditUserDialog({ user }: { user: Tables<"users"> }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: user.full_name || "",
      role: user.role_id === 1 ? "Admin" : "Staff",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updateData: any = {
      full_name: values.full_name,
      role_id: values.role === "Admin" ? 1 : 2,
    };

    const updateUserPromise = new Promise<void>((resolve, reject) => {
      supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id)
        .then(({ error }) => {
          if (error) reject(error);
          else resolve();
        });
    });

    const promises: Promise<any>[] = [updateUserPromise];

    // Add password reset promise if password is provided
    if (values.password) {
      const resetPasswordPromise = new Promise<void>((resolve, reject) => {
        supabase
          .rpc("reset_user_password", {
            _email: user.email,
            _new_password: values.password as string,
          })
          .then(({ error }) => {
            if (error) reject(error);
            else resolve();
          });
      });
      promises.push(resetPasswordPromise);
    }

    const promise = Promise.all(promises)
      .then(() => {
        setAlertOpen(false);
        refreshPage();
      })
      .catch((error) => {
        throw error;
      });

    toast.promise(promise, {
      loading: "Updating user...",
      success: "User updated successfully",
      error: (error) => `Error: ${error.message}`,
    });
  }

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mr-2" onClick={() => setAlertOpen(true)}>
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Edit User: {user.email}</h2>
          <p className="text-sm text-gray-500">
            Update user details and permissions
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Password (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAlertOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
