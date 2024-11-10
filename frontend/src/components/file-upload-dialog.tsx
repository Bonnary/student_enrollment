import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { validateExcel } from "@/lib/excel-reader";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase-client";
import { ExcelDateToJSDate, refreshPage } from "@/backend/utility-function";


export default function FileUploadDialog({
  buttonTitle,
}: {
  buttonTitle: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
const handleContinue = async () => {
  if (!file) return;

  try {
    // Validate all Excel data first
    const validatedData = await validateExcel(file);

    // Create a single promise to handle all student insertions
    const insertPromises = validatedData.map((data) =>
      supabase.rpc("insert_student", {
        generation: data.generation,
        khmer_name: data.khmer_name,
        english_name: data.english_name,
        date_of_birth: ExcelDateToJSDate(data.date_of_birth),
        sex: data.sex,
        nationality: data.nationality,
        address: data.address,
        phone_number: data.phone_number,
        facebook_or_email: data.facebook_or_email,
        father_name: data.father_name,
        father_nationality: data.father_nationality,
        father_occupation: data.father_occupation,
        father_phone_number: data.father_phone_number,
        mother_name: data.mother_name,
        mother_nationality: data.mother_nationality,
        mother_occupation: data.mother_occupation,
        mother_phone_number: data.mother_phone_number,
        session: data.session,
        subject: data.subject,
        college: data.college,
        grade: data.grade,
        family_situation: data.family_situation,
        student_job: data.student_job,
      })
    );

    // Show progress toast
    const promise = Promise.all(insertPromises);
    toast.promise(promise, {
      loading: "Uploading student data...",
      success: `Successfully added ${validatedData.length} students`,
      error: "Failed to upload student data",
    });

    await promise;
    setAlertOpen(false);
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Failed to process file"
    );
    setAlertOpen(true);
  } finally {
    setFile(null);
    refreshPage();
  }
};

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setAlertOpen(true)}>{buttonTitle}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[500px]">
        <div
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
            isDragging ? "border-primary" : "border-gray-300"
          } hover:border-primary transition-colors duration-300`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            .xlsx files only
          </p>
          {file && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Selected file: {file.name}
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center gap-10 mt-4">
          <Button
            onClick={() => setAlertOpen(false)}
            variant="destructive"
            className="text-white"
          >
            Cancel
          </Button>

          <Button  variant='outline' onClick={()=>{
            window.open(
              "https://qnagtuhjqevkiiyeoguq.supabase.co/storage/v1/object/public/image/template.xlsx"
            );
          }}>
            Download Template
          </Button>
          <Button onClick={handleContinue} disabled={!file}>
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
