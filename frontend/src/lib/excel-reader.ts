import * as yup from "yup";
import xlsx from "xlsx";

// Define the schema for each row
const rowSchema = yup.object().shape({
  generation: yup.number().required(),
  khmer_name: yup.string().required(),
  english_name: yup.string().required(),
  date_of_birth: yup
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900" })
    .max(new Date(), "Date cannot be in the future")
    .required(),
  sex: yup.string().oneOf(["M", "F"]).required(),
  nationality: yup.string().required(),
  address: yup.string().required(),
  phone_number: yup.string().required(),
  facebook_or_email: yup.string().required(),
  father_name: yup.string().required(),
  father_nationality: yup.string().required(),
  father_occupation: yup.string().required(),
  father_phone_number: yup.string().required(),
  mother_name: yup.string().required(),
  mother_nationality: yup.string().required(),
  mother_occupation: yup.string().required(),
  mother_phone_number: yup.string().required(),
  session: yup
    .string()
    .oneOf(["Morning", "Afternoon", "Evening", "Weekend"])
    .required(),
  subject: yup
    .string()
    .oneOf([
      "ភាសាអង់គ្លេសសម្រាប់ទំនាក់ទំនង",
      "អប់រំភាសាអង់គ្លេស",
      "រៀបចំបណ្តាញកុំព្យួទ័រ",
      "សរសេកម្មវិធីគ្រប់គ្រងកុំព្យូទ័រ",
      "ច្បាប់",
      "រដ្ឋបាលសាធារណៈ",
      "ច្បាប់ការទូត",
      "ច្បាប់អង្គការអន្តរជាតិ",
      "ហិរញ្ញវត្ថុនិងធនាគារ",
      "សេដ្ឋកិច្ចអភិវឌ្ឍន៍",
      "វិនិយោគនិងផ្សារភាគហ៊ុន",
      "ទីផ្សារនិងទំនាក់ទំនង",
      "គ្រប់គ្រងនិងភាពជាអ្នកដឹកនាំ",
      "គណនេយ្យ និងសវនកម្ម",
      "គ្រប់គ្រងបដិសណ្ឋារកិច្ចនិងទេសចរណ៍",
      "គ្រប់គ្រងបដិសណ្ឋាគតកិច្ចអន្តរជាតិនិងព្រឹត្តិការណ៍ផ្សេងៗ",
      "គ្រប់គ្រងឧទ្យានការកំសាន្តនិងទេសចរណ៍",
      "គម្រោងប្លង់អគារទូទៅ និងប្លង់តុតែងលម្អ",
      "សំណង់ស្ពាន ថ្នល់ និងធារាសាស្រ្ត",
      "គម្រោងប្លង់ក្រុង និងប្លង់ទស្សនីយភាព",
      "ប្រព័ន្ធអគ្គិសនីក្នុងអគារ",
      "សំណង់អគារទូទៅ",
      "ប្រព័ន្ធអគ្គិសនីបញ្ជា",
      "ប្រព័ន្ធអគ្គិសនីខ្សែបញ្ជូន",
      "ប្រវត្តិវិទ្យា",
      "ទស្សនវិជ្ជា",
      "អក្សរសាស្ត្រខ្មែរ",
      "គណិតវិទ្យា",
      "គីមីវិទ្យា",
      "រូបវិទ្យា",
      "ជីវវិទ្យា",
      "គ្រប់គ្រងពាណិជ្ជកម្ម",
      "អក្សរសាស្រ្តអង់គ្លេស",
      "គ្រប់គ្រងហិរញ្ញវត្ថុ និងធនាគារ",
      "វិទ្យាសាស្ត្រកុំព្យូរទ័រ និងព័ត៌មានវិទ្យា",
      "គ្រប់គ្រងទេសចរណ៍ និងបដិសណ្ឋារកិច្ច",
    ])
    .required(),
  college: yup
    .string()
    .oneOf([
      "សិល្បៈមនុស្សសាសន៍និងភាសា",
      "វិទ្យាសាស្ត្រនិងបច្ចេកវិទ្យា",
      "នីតិសាស្ត្រ",
      "វិជ្ជាសាស្ត្រសង្គមនិងគ្រប់គ្រងសេដ្ឋកិច្ច",
      "គ្រប់គ្រងពាណិជ្ជកម្មនិងគណនេយ្យ",
      "គ្រប់គ្រងសណ្ឋាគារនិងទេសចរណ៍",
      "វិទ្យាសាស្រ្ត វិស្វកម្ម ណិងបច្ចេកវិទ្យា",
      "វិទ្យាសាស្រ្តអប់រំ",
      "អនុបណ្ឌិត",
      "បណ្ឌិត",
    ])
    .required(),
  grade: yup
    .string()
    .oneOf(["A+", "A", "A-", "B+", "B", "C+", "C-", "C", "E+", "E-", "E", "F"])
    .required(),
  family_situation: yup
    .string()
    .oneOf([
      "កម្មករឬនិយោជិត",
      "កសិករ",
      "ពាណិជ្ជករ",
      "អ្នកលក់ដូរតូចតាច",
      "បុគ្គលិកក្រុមហ៊ុន",
      "បុគ្គលិកអង្គការក្រៅរដ្ឋាភិបាល",
      "បុគ្គលិកអង្គការអន្តរជាតិ",
      "កំព្រាឪពុក",
      "កំព្រាម្ដាយ",
      "កំព្រាឪពុកម្ដាយ",
      "ឪពុកឬម្ដាយជរា",
      "ផ្សេងៗ",
    ])
    .required(),
  student_job: yup
    .string()
    .oneOf([
      "សិស្សទើបជាប់សញ្ញាបត្របឋមសិក្សាតុល្យភូមិ",
      "ប្រជាជនធម្មតាគ្មានការងារធ្វើ",
      "ពាណិជ្ជករ",
      "បុគ្គលិកអង្គការក្រៅរដ្ឋាភិបាល",
      "បុគ្គលិកក្រុមហ៊ុន",
      "បុគ្គលិកអង្គការក្រៅរដ្ឋាភិបាល",
      "កសិករ",
      "ផ្សេងៗ",
    ])
    .required(),
});

const requiredHeaders = [
  "generation",
  "khmer_name",
  "english_name",
  "date_of_birth",
  "sex",
  "nationality",
  "address",
  "phone_number",
  "facebook_or_email",
  "father_name",
  "father_nationality",
  "father_occupation",
  "father_phone_number",
  "mother_name",
  "mother_nationality",
  "mother_occupation",
  "mother_phone_number",
  "session",
  "subject",
  "college",
  "grade",
  "family_situation",
  "student_job",
];

export async function validateExcel(file: File): Promise<any[]> {
  // Read the file as array buffer
  const buffer = await file.arrayBuffer();

  // Read the workbook from the buffer
  const workbook = xlsx.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Get the data with headers
  const jsonData: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  // Validate headers
  const headers = jsonData[0];
  if (
    !Array.isArray(headers) ||
    headers.length !== requiredHeaders.length ||
    !headers.every((header, index) => header === requiredHeaders[index])
  ) {
    throw new Error("Invalid headers in the Excel file");
  }

  // Filter out empty rows and validate non-empty rows
  const rows = jsonData.slice(1).filter((row) => {
    // Check if the row has any non-empty values
    return row.some(
      (cell) => cell !== undefined && cell !== null && cell !== ""
    );
  });

  rows.forEach((row, index) => {
    // Convert each row to an object with headers as keys
    const rowData = Object.fromEntries(
      headers.map((header, i) => [header, row[i]])
    );

    try {
      // Validate the row using the schema
      rowSchema.validateSync(rowData);
    } catch (error) {
      // Add 2 to index to account for 1-based row numbers and header row
      throw new Error(`Invalid data in row ${index + 2}: ${error}`);
    }
  });
  
  const data = jsonData
    .slice(1)
    .filter((row) =>
      row.some((cell) => cell !== undefined && cell !== null && cell !== "")
    )
    .map((row) => {
      // Convert row array to object
      const rowData = Object.fromEntries(
        headers.map((header, i) => [header, row[i]])
      );

      try {
        // Validate the object
        rowSchema.validateSync(rowData);
        return rowData; // Return the validated object
      } catch (error) {
        // Add 2 to index to account for 1-based row numbers and header row
        throw new Error(
          `Invalid data in row ${jsonData.indexOf(row) + 2}: ${error}`
        );
      }
    });

  return data;
}
