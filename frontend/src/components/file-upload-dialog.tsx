import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

export default function FileUploadDialog({
  buttonTitle,
}: {
  buttonTitle: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleContinue = () => {
    if (file) {
      console.log("Continuing with file:", file.name);
      // Add your logic here for what happens when the user clicks continue
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{buttonTitle}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
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
          <AlertDialogCancel>
            <Button variant="destructive" className="text-white">
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button onClick={handleContinue} disabled={!file}>
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
