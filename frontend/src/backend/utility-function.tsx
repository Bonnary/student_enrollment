import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase-client";
import { useNavigate } from "@tanstack/react-router";

export const logoutIfNotUser = async ({ user }: { user?: User }) => {
  const navaction = useNavigate();
  if (!user) {
    await supabase.auth.signOut();
    navaction({ to: "/" });
  }
};

export function refreshPage() {
  window.location.reload();
}

export const convertTimestampToPhnomPenhTime = (timestampz: string): string => {
  // Create a date object from the timestampz
  const date = new Date(timestampz);

  // Create options for formatting
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Phnom_Penh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedParts = formatter.formatToParts(date);

  // Build the formatted string
  let result = "";
  formattedParts.forEach((part) => {
    switch (part.type) {
      case "day":
      case "month":
      case "year":
        result += part.value;
        if (part.type !== "year") {
          result += "-";
        } else {
          result += " ";
        }
        break;
      case "hour":
      case "minute":
      case "second":
        result += part.value;
        if (part.type !== "second") {
          result += ":";
        }
        break;
    }
  });

  return result;
};

export function ExcelDateToJSDate(timestamp: number): string {
  var utc_days = Math.floor(timestamp - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  return date_info.toISOString().split("T")[0];
}

// function to convert date to sql string date format
export function dateToSqlString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const toKhmerDate = (dateString: string): string => {
  const date = new Date(dateString);

  const toKhmerNumeral = (num: number): string => {
    const khmerNumerals = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return num
      .toString()
      .split("")
      .map((n) => khmerNumerals[parseInt(n)])
      .join("");
  };

  // Khmer month names
  const khmerMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  // Get date components
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Convert to Khmer format
  const khmerDay = toKhmerNumeral(day);
  const khmerMonth = khmerMonths[month];
  const khmerYear = toKhmerNumeral(year);

  // Construct Khmer date string
  return `ថ្ងៃទី ${khmerDay} ខែ${khmerMonth} ឆ្នាំ${khmerYear}`;
};

export const toEnglishDate = (dateString: string): string => {
  const date = new Date(dateString);

  const toEnglishNumeral = (num: number): string => {
    return num.toString();
  };

  // English month names
  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get date components
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Convert to English format
  const englishDay = toEnglishNumeral(day);
  const englishMonth = englishMonths[month];
  const englishYear = toEnglishNumeral(year);

  // Construct English date string
  return `${englishMonth} ${englishDay}, ${englishYear}`;
};

export const getSubjectNameById = (id: number): string => {
  const subjectMap = new Map([
    [1, "English for Communication"],
    [2, "Teaching English"],
    [3, "Networking"],
    [4, "Programming"],
    [5, "Law"],
    [6, "Public Administration"],
    [7, "Diplomatic Law"],
    [8, "International Organization Law"],
    [9, "Finance and Banking"],
    [10, "Development Economics"],
    [11, "Investment and Stock Market"],
    [12, "Marketing and Communication"],
    [13, "Management and Leadership"],
    [14, "Accounting and Auditing"],
    [15, "Hospitality and Tourism Mannagement"],
    [16, "International Hospital and MICE Management"],
    [17, "Hospitality and Tourism Mannagement"],
    [18, "Achitechural and Interior Design"],
    [19, "Bridge, Road & Hydraulic Design & Contraction"],
    [20, "Urban Planning and Lanscape Design"],
    [21, "Electrical Installation in Building"],
    [22, "Building Design & Contraction"],
    [23, "Electrical control System"],
    [24, "Power Transmission and Distribution Line"],
    [25, "History"],
    [26, "Philosophy"],
    [27, "Khmer Literature"],
    [28, "Mathematics"],
    [29, "Chemistry"],
    [30, "Physics"],
    [31, "Biology"],
    [32, "Business Adminstration"],
    [33, "Arts in English"],
    [34, "Fanance and Banking"],
    [35, "Science and Information Technology"],
    [36, "Hospitality and Tourism Management"],
  ]);

  return subjectMap.get(id) || "Unknown Subject";
};