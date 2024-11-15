import DoctorCard from "../components/cards/DoctorCard";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { CustomText } from "../components/ui/CustomText";
import { DashboardHeader } from "../components/ui/DashboardHeader";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import sampleDoctorTwo from "../assets/sampleDoctorTwo.svg";
import sampleDoctorThree from "../assets/sampleDoctorThree.svg";
import sampleDoctorFour from "../assets/sampleDoctorFour.svg";
import { MeetingCard } from "../components/cards/MeetingCard";
import MeetingCardTwo from "../components/cards/MeetingCardTwo";
import { DashboardIcon } from "@radix-ui/react-icons";

const Dashboard = () => {
  return (
    <DashboardLayout ifHeader={false}>
      <DashboardHeader Icon={DashboardIcon} routeName="Dashboard" />

      <section className="px-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <CustomText className="text-gray_12" size="large" weight="semibold">
              Upcoming Appointments
            </CustomText>
            <CustomText
              className="text-gray_11 pb-4"
              size="medium"
              weight="normal"
            >
              View your upcoming appointments.
            </CustomText>
          </div>
          <div>
            <CustomText className="text-gray_12" size="large" weight="semibold">
              Upcoming Appointments
            </CustomText>
            <CustomText
              className="text-gray_11 pb-4"
              size="medium"
              weight="normal"
            >
              View your upcoming appointments.
            </CustomText>
          </div>
        </div>

        <div className="flex">
          <section className="flex flex-wrap w-[75%]">
            <DoctorCard
              image={sampleDoctor}
              doctorName="Dr Franklin Chang"
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
          </section>

          <section className="w-[25%]">
            <MeetingCard
              title="Second Opinion on scheduled Cancer surgery"
              date="Today"
              time="11:30PM GMT+1 ( In 30 min)"
              doctorName="Dr. Alison Ogaga"
              speciality="General Practioner"
            />
            <MeetingCardTwo
              title="Second Opinion on scheduled Cancer surge.."
              date="1 July 2023"
              time="11:30PM GMT+1"
              doctorName="Dr. Alison Ogaga"
            />
            <MeetingCardTwo
              title="Second Opinion on scheduled Cancer surge.."
              date="1 July 2023"
              time="11:30PM GMT+1"
              doctorName="Dr. Alison Ogaga"
            />
            <MeetingCardTwo
              title="Second Opinion on scheduled Cancer surge.."
              date="1 July 2023"
              time="11:30PM GMT+1"
              doctorName="Dr. Alison Ogaga"
            />
          </section>
        </div>
      </section>
    </DashboardLayout>
  );
};

export { Dashboard };
