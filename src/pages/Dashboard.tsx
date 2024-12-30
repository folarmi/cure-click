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
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorDashboardHeader } from "../components/ui/DoctorDashboardHeader";
import { Box, Flex, Text } from "@radix-ui/themes";
import { GraphCard } from "../components/cards/GraphCard";
import TopAndBottomText from "../components/atoms/TopAndBottomText";
import { NumberOfReview } from "../components/ui/NumberOfReview";
import Review from "../components/cards/Review";
import { DoctorShareProfile } from "../components/ui/DoctorShareProfile";
import { countriesData } from "../utils/data";

const Dashboard = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <DashboardLayout ifHeader={false}>
      {userType === "patient" ? (
        <DashboardHeader Icon={DashboardIcon} routeName="Dashboard" />
      ) : (
        <DoctorDashboardHeader />
      )}

      {userType === "patient" && (
        <section className="px-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <CustomText
                className="text-gray_12"
                size="large"
                weight="semibold"
              >
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
              <CustomText
                className="text-gray_12"
                size="large"
                weight="semibold"
              >
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
      )}

      {userType === "doctor" && (
        <section className="mt-7 px-12 bg-white">
          <Flex>
            <div className="w-[70%] bg-gray_bg">
              <Text className="font-semibold" size="4">
                Your Analytics
              </Text>

              <Flex className="space-x-6">
                <GraphCard count="230 Minutes" text="Consultation Minutes" />
                <GraphCard count="0 Bookings" text="Bookings" />
                <GraphCard count="9 Countries" text="Patient Countries">
                  <div className="mt-4">
                    {countriesData?.map(({ id, name, image, number }) => {
                      return (
                        <Flex
                          key={id}
                          className="mb-2"
                          align="center"
                          justify="between"
                        >
                          <Flex align="center">
                            <img src={image} className="w-5 h-5" />
                            <Text weight="regular" size="3">
                              {name}
                            </Text>
                          </Flex>
                          <Text weight="regular" size="2">
                            {number}
                          </Text>
                        </Flex>
                      );
                    })}
                  </div>
                </GraphCard>
              </Flex>

              <div className="flex p-4 items-center justify-between w-full bg-iris3 my-6">
                <TopAndBottomText top="Completed Sessions" bottom="2,349" />
                <TopAndBottomText top="Ratings" bottom="5" />
                <TopAndBottomText top="Leaderboard" bottom="Top 10" />
                <TopAndBottomText
                  top="Mostly Requested By"
                  bottom="Nigerians"
                />
              </div>

              <Text size="3" weight="medium" className="text-gray12 pb-3">
                Upcoming Appointments
              </Text>

              <MeetingCardTwo
                title="Second Opinion on scheduled Cancer surge.."
                date="1 July 2023"
                time="11:30PM GMT+1"
                ifDocDetails={false}
                ifSpaceBetween={false}
              />
              <MeetingCardTwo
                title="Second Opinion on scheduled Cancer surge.."
                date="1 July 2023"
                time="11:30PM GMT+1"
                ifDocDetails={false}
                ifSpaceBetween={false}
              />
              <MeetingCardTwo
                title="Second Opinion on scheduled Cancer surge.."
                date="1 July 2023"
                time="11:30PM GMT+1"
                ifDocDetails={false}
                ifSpaceBetween={false}
              />

              <NumberOfReview />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
                ifVerticalIcon
                ifInput
              />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
                ifVerticalIcon
                ifReply
              />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
                ifVerticalIcon
                ifReply
              />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
                ifVerticalIcon
                ifResponse
                reviewerName="Dr Macaulay Frank"
              />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
                ifVerticalIcon
                ifReply
              />
            </div>

            <div className="w-[30%] ml-6">
              <DoctorShareProfile />
            </div>
          </Flex>
        </section>
      )}
    </DashboardLayout>
  );
};

export { Dashboard };
