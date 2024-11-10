import Navigation from "@/components/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { supabase } from "@/backend/supabase-client";
import { Link, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { Functions, Tables } from "@/backend/database.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FileUploadDialog from "@/components/file-upload-dialog";
import DeleteStudentAlertDialog from "@/components/delete-student-alert-dialog";
import EditStudentDialog from "@/components/edit-student-alert-dialog";

export default function StudentPage({
  user,
  subjects,
  colleges,
}: {
  user: Tables<"users">;
  subjects: Tables<"subjects">[];
  colleges: Tables<"colleges">[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [student, setStudent] = useState<Functions<"get_student">>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchFullName, setSearchFullName] = useState("");
  const [searchMajor, setSearchMajor] = useState("");
  const [searchCollege, setSearchCollege] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        if (user.role_id !== 1) {
          return redirect({ to: "/" });
        }

        // Fetch users with pagination and search filters
        let query = supabase.rpc("get_student");

        if (searchFullName) {
          query = query.like("khmer_name", `%${searchFullName}%`);
        }

        if (searchMajor) {
          query = query.eq("subject", searchMajor);
        }

        if (searchCollege) {
          query = query.eq("college", searchCollege);
        }

        const { data, error, count } = await query.range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

        if (error) throw error;

        setStudent(data || []);
        setTotalCount(count || 0);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to fetch users");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    console.log(searchCollege);
    console.log(searchMajor);
  }, [currentPage, user?.id, searchFullName, searchMajor, searchCollege]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation active="student" user={user} />

      <main className="flex-1 h-full overflow-y-hidden">
        <div className="container p-6 mx-auto bg-[#f4f6f9]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Student List</h1>
            <FileUploadDialog buttonTitle="Add Student" />
          </div>

          <div className="p-6 mb-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Search User</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="Full Name"
                  value={searchFullName}
                  onChange={(e) => setSearchFullName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Major
                </label>
                <Select onValueChange={(value) => setSearchMajor(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Major" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject.id}
                        value={subject.subject_name.toString()}
                      >
                        {subject.subject_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Major
                </label>
                <Select onValueChange={(value) => setSearchCollege(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Major" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem
                        key={college.id}
                        value={college.college_name.toString()}
                      >
                        {college.college_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow">
            <ScrollArea className="w-full h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Generation</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{data.khmer_name}</TableCell>
                        <TableCell>{data.sex}</TableCell>
                        <TableCell>{data.subject}</TableCell>
                        <TableCell>{data.generation}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="mr-2">
                            <Link
                              to="/certificate/$studentId"
                              params={{ studentId: data.id.toString() }}
                            >
                              Certificate
                            </Link>
                          </Button>
                          <EditStudentDialog student_object={data} />
                          <DeleteStudentAlertDialog student_id={data.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </div>

          {totalCount > itemsPerPage && (
            <div className="flex justify-center mt-4">
              <nav className="inline-flex rounded-md shadow">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                >
                  Previous
                </Button>
                <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-white">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || isLoading}
                >
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
