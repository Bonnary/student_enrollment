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


import { refreshPage } from "@/backend/utility-function";



export default function DeleteStudentAlertDialog({
  student_id,
}: {
  student_id: number;
}) {
  const [alertOpen, setAlertOpen] = useState(false);

  const handelDeleteStudent = async () => {
    const deleteUserPromise = new Promise<void>((resolve, reject) => {
      supabase
        .from("students")
        .delete()
        .eq("id", student_id)
        .then(({ error }) => {
          if (error) reject(error);
          else resolve();
        });
    });

    toast.promise(deleteUserPromise, {
      loading: "Deleting student...",
      success: "Student deleted successfully",
      error: "Failed to delete student",
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
          Are you sure you want to delete this student? This action cannot be
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
          <Button variant="destructive" onClick={handelDeleteStudent}>
            Delete Student
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
