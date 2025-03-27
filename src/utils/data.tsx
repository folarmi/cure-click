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
  {
    id: 4,
    name: "Messages",
    icon: EnvelopeClosedIcon,
    path: "/messages",
  },
];

export const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const availability = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
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

export const myEventsList = [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
    allDay: true,
  },

  {
    id: 92,
    title: "Some Other Event",
    start: new Date(2015, 3, 9, 8, 0, 0),
    end: new Date(2015, 3, 10, 11, 30, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Meeting",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 24,
    title: "DST ends on this day (Europe)",
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
  },
  {
    id: 25,
    title: "DST ends on this day (America)",
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 26,
    title: "DST starts on this day (America)",
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
  },
  {
    id: 27,
    title: "DST starts on this day (Europe)",
    start: new Date(2023, 2, 26, 0, 0, 0),
    end: new Date(2023, 2, 26, 4, 30, 0),
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
