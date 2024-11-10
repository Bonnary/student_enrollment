import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/backend/supabase-client";
import { toast } from "sonner";


import { Tables } from "@/backend/database.types";
import { refreshPage } from "@/backend/utility-function";



export default function DeleteUserAlertDialog({ user }: { user: Tables<"users"> }) {
  const [alertOpen, setAlertOpen] = useState(false);

  const handelDeleteUser = async () => {
    const deleteUserPromise = new Promise<void>((resolve, reject) => {
      supabase
        .from("users")
        .delete()
        .eq("id", user.id)
        .then(({ error }) => {
          if (error) reject(error);
          else resolve();
        });
    });

    toast.promise(deleteUserPromise, {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
    });

    setAlertOpen(false);
    refreshPage();
  };

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setAlertOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <h2 className="text-lg font-semibold">Delete User</h2>

        <p className="mt-2">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <AlertDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setAlertOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handelDeleteUser}>
            Delete User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
