import certificate from "@/assets/certificate.png";
import { Functions } from "@/backend/database.types";
import {
  toEnglishDate,
  toKhmerDate,
  getSubjectNameById,
} from "@/backend/utility-function";
import { Button } from "@/components/ui/button";
export default function Certificate({
  student,
}: {
  student: Functions<"get_student_by_id">[0];
}) {
  const khmerSex = (student.sex || "M") === "M" ? "ប្រុស" : "សុខា";
  const englishSex = (student.sex || "M") === "M" ? "Male" : "Female";

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <img
        src={certificate}
        alt="certificate"
        className="object-fill w-full h-full"
      />

      {/* Khmer */}
      <p className="absolute top-[44%] left-[20%] font-bold">
        {student.khmer_name}
      </p>
      <p className="absolute top-[47%] left-[20%] font-bold">{khmerSex}</p>
      <p className="absolute top-[51%] left-[20%] font-bold">
        {toKhmerDate(student.date_of_birth)}
      </p>
      <p className="absolute top-[57%] left-[20%] font-bold">បរិញ្ញាបត្រ</p>
      <p className="absolute top-[60%] left-[20%] font-bold">
        {student.subject}
      </p>

      {/* English */}
      <p className="absolute top-[45%] right-[20%] font-bold">
        {student.english_name}
      </p>
      <p className="absolute top-[48%] right-[20%] font-bold">{englishSex}</p>
      <p className="absolute top-[52%] right-[20%] font-bold">
        {toEnglishDate(student.date_of_birth)}
      </p>
      <p className="absolute top-[57%] right-[20%] font-bold">
        Bachelor Degree
      </p>
      <p className="absolute top-[60%] right-[20%] font-bold">
        {getSubjectNameById(student.subject_id)}
      </p>

      <Button
        onClick={() => window.print()}
        className="absolute bottom-5"
      >
        Print
      </Button>
    </div>
  );
}
