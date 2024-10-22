import Navigation from "@/components/navigation";
import { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileUploadDialog from "@/components/file-upload-dialog";
import { User } from "@supabase/supabase-js";

// Generate 100 sample accounts for demonstration
const generateAccounts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 5 === 0 ? "admin" : "user",
    createdDate: format(
      new Date(
        2024,
        9,
        11,
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
      ),
      "dd-MM-yyyy hh:mm a"
    ),
  }));
};

const accounts = generateAccounts(100);

export default function StudentPage({ user }: { user: User }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return accounts.slice(startIndex, endIndex);
  };
  return (
      <div className="h-full flex dark:bg-[#1F1F1F]">
        <Navigation active="student" user={user}/>

        <main className="flex-1 h-full overflow-y-hidden ">
          <div className="container p-6 mx-auto bg-[#f4f6f9]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                Student List (Total: {accounts.length})
              </h1>
              <FileUploadDialog buttonTitle="Add New Account" />
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
                  <Input id="email" placeholder="email" />
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Input id="fullName" placeholder="Full Name" />
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
              <div className="flex justify-end mt-4 space-x-2">
                <Button>Search</Button>
                <Button className="bg-[#218838]">Clear</Button>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-lg shadow">
              <ScrollArea className="w-full h-[300px]">
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
                    {getCurrentPageData().map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.id}</TableCell>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.role}</TableCell>
                        <TableCell>{account.createdDate}</TableCell>
                        <TableCell className="text-right">
                          <Button className="mr-2">Edit</Button>
                          <Button variant="destructive" className="text-white">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {accounts.length > 10 && (
              <div className="flex justify-center mt-4">
                <nav className="inline-flex rounded-md shadow">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
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
                    disabled={currentPage === totalPages}
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
