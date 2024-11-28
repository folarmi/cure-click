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
