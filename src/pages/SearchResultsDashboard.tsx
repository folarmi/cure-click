import { Flex } from "@radix-ui/themes";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DoctorCard from "../components/cards/DoctorCard";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import sampleDoctorTwo from "../assets/sampleDoctorTwo.svg";
import sampleDoctorThree from "../assets/sampleDoctorThree.svg";
import sampleDoctorFour from "../assets/sampleDoctorFour.svg";
import doctors from "../assets/doctors.svg";
import CustomSelect from "../components/ui/CustomSelect";
import { options } from "../utils/data";
import { CustomInput } from "../components/ui/CustomInput";
import {
  CalendarIcon,
  DashboardIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomText } from "../components/ui/CustomText";
import Breadcrumb from "../components/ui/BreadCrumb";
import { BackgroundHeader } from "../components/ui/BackgroundHeader";

const SearchResultsDashboard = () => {
  return (
    <DashboardLayout ifHeader={false}>
      <BackgroundHeader className="relative">
        {/* Breadcrumb */}
        <Breadcrumb Icon={DashboardIcon} route="Find a Specialist" />

        {/* Title */}
        <CustomText
          className="w-[300px] text-indigo_12 py-6"
          size="extraLarge"
          weight="semibold"
        >
          73 Geriatric Specialists Found in United Kingdom
        </CustomText>

        <div className="absolute right-0 bottom-0 flex items-end">
          <img src={doctors} className="h-auto object-cover -mr-6" />
        </div>

        {/* Search Filters */}
        <Flex
          className="bg-iris1 p-4 space-x-4 rounded-lg relative z-10"
          align="center"
          justify="center"
        >
          <CustomSelect options={options} placeholder="Geriatric" ifGrayBg />
          <CustomSelect
            options={options}
            placeholder="United Kingdom"
            ifGrayBg
          />
          <CustomInput
            label=""
            placeholder="Search by Availability"
            icon={<CalendarIcon />}
            className="bg-alpha_3"
            type="text"
            ifGrayBg
          />
          <CustomInput
            icon={<MagnifyingGlassIcon />}
            label=""
            placeholder="Search Workplace"
            type="text"
            className="bg-alpha_3"
            ifGrayBg
          />
          <CustomButton
            icon={<MagnifyingGlassIcon />}
            variant="primary"
            className="whitespace-nowrap cursor-pointer"
          >
            Search For a Specialist
          </CustomButton>
        </Flex>
      </BackgroundHeader>

      <Flex
        align="center"
        justify="center"
        className="mt-7 mb-10 mx-auto max-w-4xl space-x-6"
      >
        <CustomSelect options={options} placeholder="Ratings" />
        <CustomSelect options={options} placeholder="Price Range" />
        <CustomSelect options={options} placeholder="Workplace" />
      </Flex>

      <section className="flex flex-wrap mx-4">
        <DoctorCard
          image={sampleDoctor}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorTwo}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorThree}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorFour}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorThree}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorThree}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorThree}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
        <DoctorCard
          image={sampleDoctorThree}
          doctorName="Dr Franklin Chang "
          doctorType="Geriatric Doctor"
          desc="Aberdeen Royal Infirmary Aberdeen UK"
          noOfSessions={3}
          cost="$35 Per Session"
          time="Today at 2:30pm"
          review="5 (13 reviews)"
          link="/dashboard/single-doctor/123"
        />
      </section>
    </DashboardLayout>
  );
};

export { SearchResultsDashboard };

<div className="relative bg-gradient-to-r from-blue-200 to-indigo-400 p-6 rounded-lg shadow-md">
  {/* Breadcrumb */}
  <div className="flex items-center mb-4">
    <span className="text-gray-600 cursor-pointer">Dashboard</span>
    <span className="mx-2">/</span>
    <span className="font-semibold">Find a Specialist</span>
  </div>

  {/* Title */}
  <h2 className="text-3xl font-bold text-gray-800 mb-2">
    73 Geriatric Specialists
  </h2>
  <p className="text-lg text-gray-700 mb-6">Found in United Kingdom</p>

  {/* Doctor Images (Behind Filter Section) */}
  <div className="absolute right-0 bottom-0 flex items-end">
    <img src={doctors} alt="Doctor 1" className="h-auto object-cover -mr-6" />
  </div>

  {/* Search Filters */}
  <div className="relative z-10 flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
    <select className="flex-1 p-2 border border-gray-300 rounded">
      <option>Geriatric</option>
    </select>
    <select className="flex-1 p-2 border border-gray-300 rounded">
      <option>United Kingdom</option>
    </select>
    <input
      type="text"
      className="flex-1 p-2 border border-gray-300 rounded"
      placeholder="12 Oct - 16 Oct 2024"
    />
    <input
      type="text"
      className="flex-1 p-2 border border-gray-300 rounded"
      placeholder="Search Workplace"
    />
    <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
      Search For a Specialist
    </button>
  </div>
</div>;
