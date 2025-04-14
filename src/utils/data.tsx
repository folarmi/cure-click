import {
  CalendarIcon,
  DashboardIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import createAccount from "../assets/icons/createAccount.svg";
import verifyEmail from "../assets/icons/verifyEmail.svg";
import welcomeOnboard from "../assets/icons/welcomeOnboard.svg";
// import { FaWallet } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import avatar from "../assets/avatar.svg";
import modeOne from "../assets/modeOne.svg";
import modeTwo from "../assets/modeTwo.svg";
import modeThree from "../assets/modeThree.svg";
import Nigeria from "../assets/icons/Nigeria.svg";
import Ghana from "../assets/icons/Ghana.svg";
import Germany from "../assets/icons/Germany.svg";
import SouthAfrica from "../assets/icons/SouthAfrica.svg";

export const onboardingSteps = [
  {
    id: 1,
    title: "Create Your Account",
    subText: "Provide the necessary details required to create your account",
    img: createAccount,
    link: "/",
  },
  {
    id: 2,
    title: "Verify Your Email",
    subText: "Provide the necessary details required to create your account",
    img: verifyEmail,
    link: "/verify-email",
  },
  {
    id: 3,
    title: "Welcome Onboard",
    subText: "Provide the necessary details required to create your account",
    img: welcomeOnboard,
    link: "verify-email",
  },
];

export const navBarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Appointments",
    icon: CalendarIcon,
    path: "/dashboard/appointments",
  },
  {
    id: 3,
    name: "Wallet",
    icon: IoWalletOutline,
    path: "/dashboard/wallet",
  },
  // {
  //   id: 4,
  //   name: "Messages",
  //   icon: EnvelopeClosedIcon,
  //   path: "/messages",
  // },
];

export const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const availability = [
  { value: "AVAILABLE", label: "Available" },
  { value: "NOT_AVAILABLE", label: "Not Available" },
];

export const gender = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export const sampleLanguages = [
  { value: "Afrikaans", label: "Afrikaans" },
  { value: "Albanian", label: "Albanian" },
  { value: "Amharic", label: "Amharic" },
  { value: "Arabic", label: "Arabic" },
  { value: "Armenian", label: "Armenian" },
  { value: "Azerbaijani", label: "Azerbaijani" },
  { value: "Basque", label: "Basque" },
  { value: "Belarusian", label: "Belarusian" },
  { value: "Bengali", label: "Bengali" },
  { value: "Bosnian", label: "Bosnian" },
  { value: "Bulgarian", label: "Bulgarian" },
  { value: "Burmese", label: "Burmese" },
  { value: "Catalan", label: "Catalan" },
  { value: "Cebuano", label: "Cebuano" },
  { value: "Chinese (Simplified)", label: "Chinese (Simplified)" },
  { value: "Chinese (Traditional)", label: "Chinese (Traditional)" },
  { value: "Corsican", label: "Corsican" },
  { value: "Croatian", label: "Croatian" },
  { value: "Czech", label: "Czech" },
  { value: "Danish", label: "Danish" },
  { value: "Dutch", label: "Dutch" },
  { value: "English", label: "English" },
  { value: "Esperanto", label: "Esperanto" },
  { value: "Estonian", label: "Estonian" },
  { value: "Finnish", label: "Finnish" },
  { value: "French", label: "French" },
  { value: "Frisian", label: "Frisian" },
  { value: "Galician", label: "Galician" },
  { value: "Georgian", label: "Georgian" },
  { value: "German", label: "German" },
  { value: "Greek", label: "Greek" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Haitian Creole", label: "Haitian Creole" },
  { value: "Hausa", label: "Hausa" },
  { value: "Hawaiian", label: "Hawaiian" },
  { value: "Hebrew", label: "Hebrew" },
  { value: "Hindi", label: "Hindi" },
  { value: "Hmong", label: "Hmong" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Icelandic", label: "Icelandic" },
  { value: "Igbo", label: "Igbo" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Irish", label: "Irish" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Javanese", label: "Javanese" },
  { value: "Kannada", label: "Kannada" },
  { value: "Kazakh", label: "Kazakh" },
  { value: "Khmer", label: "Khmer" },
  { value: "Kinyarwanda", label: "Kinyarwanda" },
  { value: "Korean", label: "Korean" },
  { value: "Kurdish", label: "Kurdish" },
  { value: "Kyrgyz", label: "Kyrgyz" },
  { value: "Lao", label: "Lao" },
  { value: "Latin", label: "Latin" },
  { value: "Latvian", label: "Latvian" },
  { value: "Lithuanian", label: "Lithuanian" },
  { value: "Luxembourgish", label: "Luxembourgish" },
  { value: "Macedonian", label: "Macedonian" },
  { value: "Malagasy", label: "Malagasy" },
  { value: "Malay", label: "Malay" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Maltese", label: "Maltese" },
  { value: "Maori", label: "Maori" },
  { value: "Marathi", label: "Marathi" },
  { value: "Mongolian", label: "Mongolian" },
  { value: "Nepali", label: "Nepali" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Nyanja", label: "Nyanja" },
  { value: "Odia", label: "Odia" },
  { value: "Pashto", label: "Pashto" },
  { value: "Persian", label: "Persian" },
  { value: "Polish", label: "Polish" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Romanian", label: "Romanian" },
  { value: "Russian", label: "Russian" },
  { value: "Samoan", label: "Samoan" },
  { value: "Scots Gaelic", label: "Scots Gaelic" },
  { value: "Serbian", label: "Serbian" },
  { value: "Sesotho", label: "Sesotho" },
  { value: "Shona", label: "Shona" },
  { value: "Sindhi", label: "Sindhi" },
  { value: "Sinhala", label: "Sinhala" },
  { value: "Slovak", label: "Slovak" },
  { value: "Slovenian", label: "Slovenian" },
  { value: "Somali", label: "Somali" },
  { value: "Spanish", label: "Spanish" },
  { value: "Sundanese", label: "Sundanese" },
  { value: "Swahili", label: "Swahili" },
  { value: "Swedish", label: "Swedish" },
  { value: "Tagalog", label: "Tagalog" },
  { value: "Tajik", label: "Tajik" },
  { value: "Tamil", label: "Tamil" },
  { value: "Tatar", label: "Tatar" },
  { value: "Telugu", label: "Telugu" },
  { value: "Thai", label: "Thai" },
  { value: "Turkish", label: "Turkish" },
  { value: "Turkmen", label: "Turkmen" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Urdu", label: "Urdu" },
  { value: "Uyghur", label: "Uyghur" },
  { value: "Uzbek", label: "Uzbek" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Welsh", label: "Welsh" },
  { value: "Xhosa", label: "Xhosa" },
  { value: "Yiddish", label: "Yiddish" },
  { value: "Yoruba", label: "Yoruba" },
  { value: "Zulu", label: "Zulu" },
];

export const sampleSpecializations = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Endocrinology", label: "Endocrinology" },
  { value: "Family Medicine", label: "Family Medicine" },
  { value: "Gastroenterology", label: "Gastroenterology" },
  { value: "Hematology", label: "Hematology" },
  { value: "Infectious Disease", label: "Infectious Disease" },
  { value: "Neurology", label: "Neurology" },
  { value: "Obstetrics/Gynecology", label: "Obstetrics/Gynecology" },
  { value: "Oncology", label: "Oncology" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Otolaryngology", label: "Otolaryngology" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Pulmonology", label: "Pulmonology" },
  { value: "Radiology", label: "Radiology" },
  { value: "Rheumatology", label: "Rheumatology" },
  { value: "Urology", label: "Urology" },
  { value: "Anesthesiology", label: "Anesthesiology" },
  { value: "Emergency Medicine", label: "Emergency Medicine" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Internal Medicine", label: "Internal Medicine" },
  { value: "Nephrology", label: "Nephrology" },
  { value: "Pathology", label: "Pathology" },
];

// export const sampleCurrencies = [
//   { value: "USD - US DOLLAR", label: "USD - US Dollar" },
//   { value: "EUR - EURO", label: "EUR - Euro" },
//   { value: "GBP - BRITISH POUND", label: "GBP - British Pound" },
//   { value: "JPY - JAPANESE YEN", label: "JPY - Japanese Yen" },
//   { value: "AUD - AUSTRALIAN DOLLAR", label: "AUD - Australian Dollar" },
//   { value: "CAD - CANADIAN DOLLAR", label: "CAD - Canadian Dollar" },
//   { value: "CHF - SWISS FRANC", label: "CHF - Swiss Franc" },
//   { value: "CNY - CHINESE YUAN", label: "CNY - Chinese Yuan" },
//   { value: "INR - INDIAN RUPEE", label: "INR - Indian Rupee" },
//   { value: "SGD - SINGAPORE DOLLAR", label: "SGD - Singapore Dollar" },
//   { value: "NZD - NEW ZEALAND DOLLAR", label: "NZD - New Zealand Dollar" },
//   { value: "MXN - MEXICAN PESO", label: "MXN - Mexican Peso" },
//   { value: "BRL - BRAZILIAN REAL", label: "BRL - Brazilian Real" },
//   { value: "ZAR - SOUTH AFRICAN RAND", label: "ZAR - South African Rand" },
//   { value: "RUB - RUSSIAN RUBLE", label: "RUB - Russian Ruble" },
//   { value: "HKD - HONG KONG DOLLAR", label: "HKD - Hong Kong Dollar" },
//   { value: "KRW - SOUTH KOREAN WON", label: "KRW - South Korean Won" },
//   { value: "TRY - TURKISH LIRA", label: "TRY - Turkish Lira" },
//   { value: "IDR - INDONESIAN RUPIAH", label: "IDR - Indonesian Rupiah" },
//   { value: "SEK - SWEDISH KRONA", label: "SEK - Swedish Krona" },
//   { value: "NGN - NIGERIAN NAIRA", label: "NGN - Nigerian Naira" },
//   { value: "PHP - PHILIPPINE PESO", label: "PHP - Philippine Peso" },
//   { value: "THB - THAI BAHT", label: "THB - Thai Baht" },
//   { value: "MYR - MALAYSIAN RINGGIT", label: "MYR - Malaysian Ringgit" },
//   { value: "SAR - SAUDI RIYAL", label: "SAR - Saudi Riyal" },
//   { value: "AED - UAE DIRHAM", label: "AED - UAE Dirham" },
//   { value: "DKK - DANISH KRONE", label: "DKK - Danish Krone" },
//   { value: "PLN - POLISH ZLOTY", label: "PLN - Polish Zloty" },
//   { value: "HUF - HUNGARIAN FORINT", label: "HUF - Hungarian Forint" },
//   { value: "CZK - CZECH KORUNA", label: "CZK - Czech Koruna" },
//   { value: "ILS - ISRAELI SHEKEL", label: "ILS - Israeli Shekel" },
//   { value: "CLP - CHILEAN PESO", label: "CLP - Chilean Peso" },
//   { value: "PKR - PAKISTANI RUPEE", label: "PKR - Pakistani Rupee" },
//   { value: "EGP - EGYPTIAN POUND", label: "EGP - Egyptian Pound" },
//   { value: "COP - COLOMBIAN PESO", label: "COP - Colombian Peso" },
//   { value: "VND - VIETNAMESE DONG", label: "VND - Vietnamese Dong" },
//   { value: "BDT - BANGLADESHI TAKA", label: "BDT - Bangladeshi Taka" },
//   { value: "ARS - ARGENTINE PESO", label: "ARS - Argentine Peso" },
//   { value: "RON - ROMANIAN LEU", label: "RON - Romanian Leu" },
//   { value: "PEN - PERUVIAN SOL", label: "PEN - Peruvian Sol" },
//   { value: "KWD - KUWAITI DINAR", label: "KWD - Kuwaiti Dinar" },
// ];

export const sampleCurrencies = [
  { value: "DOLLAR", label: "DOLLAR" },
  { value: "NAIRA", label: "NAIRA" },
  { value: "EURO", label: "EURO" },
];

export const sampleTime = [
  {
    id: 1,
    timeSlot: "12:00 - 1:00 PM",
  },
  {
    id: 2,
    timeSlot: "1:00 - 2:00 PM",
  },
  {
    id: 3,
    timeSlot: "2:00 - 3:00 PM",
  },
  {
    id: 4,
    timeSlot: "3:00 - 4:00 PM",
  },
  {
    id: 5,
    timeSlot: "4:00 - 5:00 PM",
  },
];

export const tableHeader = [
  {
    id: 1,
    name: "Description",
  },
  {
    id: 2,
    name: "Amount",
  },
  {
    id: 3,
    name: "Type",
  },
  {
    id: 4,
    name: "Date",
  },
];

export const tableSample = [
  {
    id: 1,
    desc: "Wallet Deposit",
    amt: "+ NGN 30,000",
    type: "Wallet Deposit",
    date: "Jun 10, 2022 at 12:32pm",
  },
  {
    id: 2,
    desc: "Appointment with Dr King",
    amt: "- NGN 30,000",
    type: "Appointment",
    date: "Jun 10, 2022 at 12:32pm",
  },
  {
    id: 3,
    desc: "Refund from Dr King",
    amt: "+ NGN 30,000",
    type: "Refund",
    date: "Jun 10, 2022 at 12:32pm",
  },
];

export const appointmentSampleData = [
  {
    id: 1,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 2,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Cancelled",
  },
  {
    id: 3,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 4,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 5,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 6,
    nameOfDoc: "Dr Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
];

export const reasonsForCalling = [
  {
    id: 1,
    reason: "Doctor asked me to cancel",
  },
  {
    id: 2,
    reason: "I don’t need the service anymore",
  },
  {
    id: 3,
    reason: "Doctor Did Not Attend session",
  },
  {
    id: 4,
    reason: "Other Reasons",
  },
];

export const sampleNotifications = [
  {
    id: 1,
    img: avatar,
    text: "Your scheduled appointment with Dr Micheal J is happening in 30 minutes",
    time: "2s ago",
  },
  {
    id: 2,
    img: avatar,
    text: "Your appointment with Dr Micheal J has been cancelled",
    time: "2hrs ago",
  },
];

export const themeData = [
  {
    id: 1,
    img: modeOne,
    text: "Light Mode",
  },
  {
    id: 2,
    img: modeTwo,
    text: "Dark Mode",
  },
  {
    id: 3,
    img: modeThree,
    text: "System",
  },
];

export const daysOfTheWeek = [
  {
    id: 1,
    name: "S",
    filled: false,
  },
  {
    id: 2,
    name: "M",
    filled: true,
  },
  {
    id: 3,
    name: "T",
    filled: false,
  },
  {
    id: 4,
    name: "W",
    filled: true,
  },
  {
    id: 5,
    name: "T",
    filled: false,
  },
  {
    id: 6,
    name: "F",
    filled: true,
  },
  {
    id: 7,
    name: "S",
    filled: true,
  },
];

export const doctorSampleData = [
  {
    id: 1,
    nameOfPatient: "Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 2,
    nameOfPatient: "Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 3,
    nameOfPatient: "Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 4,
    nameOfPatient: "Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
  {
    id: 5,
    nameOfPatient: "Franklin Chang",
    docType: "Geriatric Doctor",
    summaryTitle: "Second Opinion on scheduled Cancer surgery",
    summaryText: "Second Opinion on scheduled Cancer surgery",
    date: "1 Jul, 2023",
    time: "1:00 PM GMT +1",
    status: "Upcoming",
  },
];

export const availableTimes = [
  {
    id: 1,
    day: "Monday",
    status: "5 availability periods",
  },
  {
    id: 2,
    day: "Tuesday",
    status: "No availability periods",
  },
  {
    id: 3,
    day: "Wednesdays",
    status: "No availability periods",
  },
  {
    id: 4,
    day: "Thursdays",
    status: "No availability periods",
  },
  {
    id: 5,
    day: "Fridays",
    status: "No availability periods",
  },
  {
    id: 6,
    day: "Saturdays",
    status: "2 availability periods",
  },
  {
    id: 7,
    day: "Sundays",
    status: "3 availability periods",
  },
];

// export const myEventsList = [
//   {
//     title: "Team Meeting",
//     start: new Date(2024, 11, 28, 10, 0), // December 28, 2024, 10:00 AM
//     end: new Date(2024, 11, 28, 11, 0), // December 28, 2024, 11:00 AM
//     description: "Weekly team sync to discuss project updates.",
//     location: "Conference Room A",
//   },
//   {
//     title: "Lunch with Client",
//     start: new Date(2024, 11, 28, 13, 0), // December 28, 2024, 1:00 PM
//     end: new Date(2024, 11, 28, 14, 0), // December 28, 2024, 2:00 PM
//     description: "Discuss project roadmap with the client.",
//     location: "Downtown Cafe",
//   },
//   {
//     title: "Presentation Review",
//     start: new Date(2024, 11, 29, 9, 30), // December 29, 2024, 9:30 AM
//     end: new Date(2024, 11, 29, 10, 30), // December 29, 2024, 10:30 AM
//     description: "Review slides for the quarterly meeting.",
//     location: "Zoom",
//   },
//   {
//     title: "Project Deadline",
//     start: new Date(2024, 11, 30, 0, 0), // December 30, 2024, All Day Event
//     end: new Date(2024, 11, 30, 23, 59),
//     description: "Complete and submit the final project deliverables.",
//     location: "Online",
//     allDay: true,
//   },
// ];

// {
//   id: 1,
//   title: "Long Event",
//   start: new Date(2015, 3, 7),
//   end: new Date(2015, 3, 10),
// },

export const myEventsList = [
  {
    id: "1",
    title: "3 Available",
    start: new Date(2025, 3, 10, 10, 0),
    end: new Date(2025, 3, 10, 11, 0),
  },
  {
    id: "2",
    title: "5 Available",
    start: new Date(2025, 3, 12, 12, 0),
    end: new Date(2025, 3, 12, 13, 0),
  },
];

export const countriesData = [
  {
    id: 1,
    name: "Nigeria",
    image: Nigeria,
    number: 4,
  },
  {
    id: 2,
    name: "Ghana",
    image: Ghana,
    number: 4,
  },
  {
    id: 3,
    name: "Germany",
    image: Germany,
    number: 4,
  },
  {
    id: 4,
    name: "South Africa",
    image: SouthAfrica,
    number: 4,
  },
  {
    id: 1,
    name: "Nigeria",
    image: Nigeria,
    number: 4,
  },
  {
    id: 2,
    name: "Ghana",
    image: Ghana,
    number: 4,
  },
  {
    id: 3,
    name: "Germany",
    image: Germany,
    number: 4,
  },
  {
    id: 4,
    name: "South Africa",
    image: SouthAfrica,
    number: 4,
  },
  {
    id: 1,
    name: "Nigeria",
    image: Nigeria,
    number: 4,
  },
  {
    id: 2,
    name: "Ghana",
    image: Ghana,
    number: 4,
  },
  {
    id: 3,
    name: "Germany",
    image: Germany,
    number: 4,
  },
  {
    id: 4,
    name: "South Africa",
    image: SouthAfrica,
    number: 4,
  },
];

// {
//   "publicId": "2219174CSQ0327336",
//   "doctorPublicId": "221917ZP92YX27336",
//   "dayOfTheWeek": "MONDAY",
//   "availableTimes": 0,
//   "localTimes": [
//       "11:30:00"
//   ],
//   "available": null,
//   "recurring": false
// }

export const sessionsData = [
  {
    publicId: "13173833Y2HN6988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "MONDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "13173870A8S96988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "TUESDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "1317380PL3106988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "WEDNESDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "131738GH0V0O6988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "THURSDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "131738I6720G6988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "FRIDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "131738QX6C5Y6988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "SATURDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
  {
    publicId: "131738V7F1WZ6988",
    doctorPublicId: "131738A1205K6988",
    dayOfTheWeek: "SUNDAY",
    availableTimes: 0,
    localTimes: [],
    available: false,
    recurring: false,
    timeZone: null,
  },
];

// const submitAvailableSessions = () => {
//   updateDoctorAvailableSessionMutation.mutate({
//     doctorPublicId: doctorProfile?.data?.publicId,
//     dayOfTheWeek: numberToWeekday(selectedID),
// localTimes: getValues("addPeriod").map(
//   (slot: { startTime: string; endTime: string }) =>
//     convertToLocalTimeFormat(slot.startTime)
// ),
//     available: isSwitchEnabled,
//   });
// };

export const sampleDaysOfTheWeek = [
  {
    label: "Monday",
    value: "Monday",
  },
  {
    label: "Tuesday",
    value: "Tuesday",
  },
  {
    label: "Wednesday",
    value: "Wednesday",
  },
  {
    label: "Thursday",
    value: "Thursday",
  },
  {
    label: "Friday",
    value: "Friday",
  },
  {
    label: "Saturday",
    value: "Saturday",
  },
  {
    label: "Sunday",
    value: "Sunday",
  },
];

export const monthsOfTheYear = [
  {
    label: "January",
    value: "1",
  },
  {
    label: "February",
    value: "2",
  },
  {
    label: "March",
    value: "3",
  },
  {
    label: "April",
    value: "4",
  },
  {
    label: "May",
    value: "5",
  },
  {
    label: "June",
    value: "6",
  },
  {
    label: "July",
    value: "7",
  },
  {
    label: "August",
    value: "8",
  },
  {
    label: "September",
    value: "9",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  },
];
