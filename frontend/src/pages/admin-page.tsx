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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { supabase } from "@/backend/supabase-client";
import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { convertTimestampToPhnomPenhTime } from "@/backend/utility-function";
import AddUserAlertDialog from "@/components/add-user-alert-dialog";
import { Tables } from "@/backend/database.types";
import EditUserDialog from "@/components/edit-user-alert-dialog";
import DeleteUserAlertDialog from "@/components/delete-user-alert-dialog";

export default function AdminPage({ user }: { user: Tables<"users"> }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [accounts, setAccounts] = useState<Tables<"users">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchFullName, setSearchFullName] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        if (user.role_id !== 1) {
          return redirect({ to: "/" });
        }

        // Fetch users with pagination and search filters
        let query = supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });

        if (searchEmail) {
          query = query.like("email", `%${searchEmail}%`);
        }

        if (searchFullName) {
          query = query.like("full_name", `%${searchFullName}%`);
        }

        if (selectedDate) {
          query = query.gte("created_at", selectedDate.toISOString());
        }

        const { data, error, count } = await query.range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

        if (error) throw error;

        setAccounts(data || []);
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
  }, [currentPage, user?.id, searchEmail, searchFullName, selectedDate]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);


  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation active="admin" user={user} />

      <main className="flex-1 h-full overflow-y-hidden">
        <div className="container p-6 mx-auto bg-[#f4f6f9]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold" >
              Account List
            </h1>
            <AddUserAlertDialog />
          </div>

          <div className="p-6 mb-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Search User</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  placeholder="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>
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
                  htmlFor="date"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* <div className="flex justify-end mt-4 space-x-2">
              <Button>Search</Button>
              <Button
                className="bg-[#218838]"
                onClick={() => {
                  setSearchEmail("");
                  setSearchFullName("");
                  setSelectedDate(undefined);
                }}
              >
                Clear
              </Button>
            </div> */}
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
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account, index) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell>{account.full_name}</TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>
                          {account.role_id === 1 ? "Admin" : "Staff"}
                        </TableCell>
                        <TableCell>
                          {convertTimestampToPhnomPenhTime(account.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <EditUserDialog user={account} />
                          <DeleteUserAlertDialog user={account} />
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
