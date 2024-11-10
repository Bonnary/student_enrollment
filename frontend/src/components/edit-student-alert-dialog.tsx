import { useEffect, useState } from "react";
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
import { Functions, Tables } from "@/backend/database.types";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateToSqlString, refreshPage } from "@/backend/utility-function";

const formSchema = z.object({
  generation: z.number(),
  khmer_name: z.string(),
  english_name: z.string(),
  date_of_birth: z
    .date({
      required_error: "Date of birth is required",
    })
    .min(new Date("1900-01-01"), {
      message: "Date must be after 1900",
    })
    .max(new Date(), {
      message: "Date cannot be in the future",
    }),
  sex: z.string().max(1),
  nationality: z.string(),
  address: z.string(),
  phone_number: z.string(),
  facebook_or_email: z.string(),
  father_name: z.string(),
  father_nationality: z.string(),
  father_occupation: z.string(),
  father_phone_number: z.string(),
  mother_name: z.string(),
  mother_nationality: z.string(),
  mother_occupation: z.string(),
  mother_phone_number: z.string(),
  session_id: z.number(),
  subject_id: z.number(),
  college_id: z.number(),
  grade_id: z.number(),
  family_situation_id: z.number(),
  student_job_id: z.number(),
});

export default function EditStudentDialog({
  student_object,
}: {
  student_object: Functions<"get_student">[0];
}) {
  const [alertOpen, setAlertOpen] = useState(false);

  const [session, setSession] = useState<Tables<"sessions">[]>([]);
  const [subject, setSubject] = useState<Tables<"subjects">[]>([]);
  const [college, setCollege] = useState<Tables<"colleges">[]>([]);
  const [grade, setGrade] = useState<Tables<"grades">[]>([]);
  const [familySituation, setFamilySituation] = useState<
    Tables<"family_situations">[]
  >([]);
  const [studentJob, setStudentJob] = useState<Tables<"student_jobs">[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await supabase
          .from("sessions")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setSession(data);
          });
        await supabase
          .from("subjects")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setSubject(data);
          });
        await supabase
          .from("colleges")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setCollege(data);
          });
        await supabase
          .from("grades")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setGrade(data);
          });
        await supabase
          .from("family_situations")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setFamilySituation(data);
          });
        await supabase
          .from("student_jobs")
          .select("*")
          .then(({ data, error }) => {
            if (error) throw error;
            setStudentJob(data);
          });
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generation: student_object.generation,
      khmer_name: student_object.khmer_name,
      english_name: student_object.english_name,
      date_of_birth: new Date(student_object.date_of_birth),
      sex: student_object.sex,
      nationality: student_object.nationality,
      address: student_object.address,
      phone_number: student_object.phone_number,
      facebook_or_email: student_object.facebook_or_email,
      father_name: student_object.father_name,
      father_nationality: student_object.father_nationality,
      father_occupation: student_object.father_occupation,
      father_phone_number: student_object.father_phone_number,
      mother_name: student_object.mother_name,
      mother_nationality: student_object.mother_nationality,
      mother_occupation: student_object.mother_occupation,
      mother_phone_number: student_object.mother_phone_number,
      session_id: student_object.session_id,
      subject_id: student_object.subject_id,
      college_id: student_object.college_id,
      grade_id: student_object.grade_id,
      family_situation_id: student_object.family_situation_id,
      student_job_id: student_object.student_job_id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = new Promise((resolve, reject) => {
      supabase
        .from("students")
        .update({
          generation: values.generation,
          khmer_name: values.khmer_name,
          english_name: values.english_name,
          date_of_birth: dateToSqlString(values.date_of_birth),
          sex: values.sex,
          nationality: values.nationality,
          address: values.address,
          phone_number: values.phone_number,
          facebook_or_email: values.facebook_or_email,
          father_name: values.father_name,
          father_nationality: values.father_nationality,
          father_occupation: values.father_occupation,
          father_phone_number: values.father_phone_number,
          mother_name: values.mother_name,
          mother_nationality: values.mother_nationality,
          mother_occupation: values.mother_occupation,
          mother_phone_number: values.mother_phone_number,
          session_id: values.session_id,
          subject_id: values.subject_id,
          college_id: values.college_id,
          grade_id: values.grade_id,
          family_situation_id: values.family_situation_id,
          student_job_id: values.student_job_id,
        })
        .eq("id", student_object.id)
        .then((res) => {
          if (res.error) {
            reject(res.error);
          } else {
            resolve(res);
            setAlertOpen(false);
            refreshPage();
          }
        });
    });

     toast.promise(promise, {
       loading: "Loading...",
       success: "Update student successfully",
       error: (promise) => `Error: ${promise.message}`,
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
        <ScrollArea className="max-h-[600px]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Edit Student: {student_object.khmer_name}
            </h2>
            <p className="text-sm text-gray-500">
              Update user details and permissions
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="generation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generation</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Generation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="khmer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khmer Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Khmer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="english_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="English Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={student_object.sex} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_or_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook or Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Facebook or Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="father_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Father name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="father_nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father nationality</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Father nationality"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="father_occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father occupation</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Father occupation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="father_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Father phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mother_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Mother name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mother_nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother nationality</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mother nationality"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mother_occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother occupation</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mother occupation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mother_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mother phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="session_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={student_object.session} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {session.map((session) => (
                          <SelectItem
                            key={session.id}
                            value={session.id.toString()}
                          >
                            {session.session_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={student_object.subject} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subject.map((subject) => (
                          <SelectItem
                            key={subject.id}
                            value={subject.id.toString()}
                          >
                            {subject.subject_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={student_object.college} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {college.map((college) => (
                          <SelectItem
                            key={college.id}
                            value={college.id.toString()}
                          >
                            {college.college_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={student_object.grade} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {grade.map((grade) => (
                          <SelectItem
                            key={grade.id}
                            value={grade.id.toString()}
                          >
                            {grade.grade_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="family_situation_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family situation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={student_object.family_situation}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {familySituation.map((obj) => (
                          <SelectItem key={obj.id} value={obj.id.toString()}>
                            {obj.family_situation_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="student_job_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student job</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={student_object.student_job}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentJob.map((obj) => (
                          <SelectItem key={obj.id} value={obj.id.toString()}>
                            {obj.student_job_name}
                          </SelectItem>
                        ))}
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
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
