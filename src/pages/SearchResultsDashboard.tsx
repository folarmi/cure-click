import { Flex } from "@radix-ui/themes";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DoctorCard from "../components/cards/DoctorCard";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import sampleDoctorTwo from "../assets/sampleDoctorTwo.svg";
import sampleDoctorThree from "../assets/sampleDoctorThree.svg";
import sampleDoctorFour from "../assets/sampleDoctorFour.svg";
// import doctors from "../assets/doctors.png";
import doctors from "../assets/doctors.svg";
import CustomSelect from "../components/ui/CustomSelect";
import { options } from "../utils/data";
import headerBg from "../assets/headerBg.svg";
import { CustomInput } from "../components/ui/CustomInput";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CustomButton } from "../components/ui/CustomButton";
import { CustomText } from "../components/ui/CustomText";
import Breadcrumb from "../components/ui/BreadCrumb";

// h-[290px]
const SearchResultsDashboard = () => {
  return (
    <DashboardLayout ifHeader={false}>
      <div
        className="bg-cover bg-center px-12 py-8 h-[350px]"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <Breadcrumb route="Find a Specialist" />
        <Flex justify="between" align="center">
          <CustomText
            className="w-[300px] text-indigo_12 py-6"
            size="extraLarge"
            weight="semibold"
          >
            73 Geriatric Specialists Found in United Kingdom
          </CustomText>
          <img src={doctors} className="h-[200px]" />
        </Flex>

        <Flex
          className="bg-iris1 p-4 space-x-4 rounded-lg"
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
      </div>

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
