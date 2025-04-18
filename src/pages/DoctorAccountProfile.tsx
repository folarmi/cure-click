import { Badge, Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import BadgeIcon from "../assets/icons/Badge.svg";
import { IoBriefcaseOutline } from "react-icons/io5";
import { HiLocationMarker, HiOutlineTranslate } from "react-icons/hi";
import TopAndBottomText from "../components/atoms/TopAndBottomText";
import { GraphCard } from "../components/cards/GraphCard";
import { DocAchievement } from "../components/ui/DocAchievement";
import medalOne from "../assets/medalOne.svg";
import medalTwo from "../assets/medalTwo.svg";
import medalFour from "../assets/medalFour.svg";
import medalThree from "../assets/medalThree.svg";
import { DoctorShareProfile } from "../components/ui/DoctorShareProfile";
import Review from "../components/cards/Review";
import { NumberOfReview } from "../components/ui/NumberOfReview";
import { useState } from "react";
import { UpdateDetails } from "../components/modals/UpdateDetails";
import { Loader } from "../components/ui/Loader";
import {
  capitalize,
  getFullName,
  renderCommaSeparatedSpans,
} from "../utils/util";
import { useGetDoctorProfile } from "../lib/apiCalls";

const DoctorAccountProfile = () => {
  const [modal, setModal] = useState(false);
  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile();

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {doctorProfileIsLoading ? (
        <Loader />
      ) : (
        <Flex direction="column" className=" px-3 md:px-12">
          {!modal && (
            <>
              <Flex align="center" justify="between">
                <Box>
                  <img
                    src={sampleDoctor}
                    className="w-[100px] h-[100px] object-cover rounded-lg"
                  />
                  <Flex align="center" className="mt-4">
                    <Text
                      as="p"
                      size="7"
                      weight="medium"
                      className="text-2xl md:text-4xl text-indigo_12 whitespace-nowrap"
                    >
                      {getFullName(
                        doctorProfile?.data?.firstname,
                        doctorProfile?.data?.lastname
                      )}
                    </Text>
                    <img src={BadgeIcon} className="w-[34px] h-[34px]" />
                  </Flex>
                </Box>
                <Button
                  size="4"
                  onClick={() => toggleModal()}
                  className="bg-white text-neutral_11 font-medium text-lg cursor-pointer"
                  style={{
                    border: "1px solid var(--border-gray)",
                  }}
                >
                  Edit Profile
                </Button>
              </Flex>

              <Box className="mt-5">
                <Tabs.Root defaultValue="overview">
                  <Tabs.List className="border-b">
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="overview">
                    <Flex className="flex-col md:flex-row">
                      <Box className="w-full md:w-[70%] mt-5">
                        <Text
                          size="3"
                          className="text-gray9 w-[1002px] justify-start"
                        >
                          {doctorProfile?.data?.biography}
                        </Text>

                        <Flex
                          align="center"
                          wrap="wrap"
                          justify="between"
                          className="mt-5 bg-white border border-gray2 p-4 rounded-md"
                        >
                          <Text size="2" className="text-gray11">
                            {doctorProfile?.data?.yearsOfExperience || "-"}{" "}
                            years Experience
                          </Text>
                          <Text size="2" className="text-gray11">
                            {capitalize(doctorProfile?.data?.gender) || "N/A"}
                          </Text>
                          <Text size="2" className="text-gray11">
                            {doctorProfile?.data?.gender === "MALE"
                              ? "He/Him"
                              : "She/Her"}
                          </Text>
                          <Badge
                            variant="soft"
                            size="2"
                            className="text-accent_alpha_11"
                          >
                            <IoBriefcaseOutline className="w-4 h-4 " />
                            {doctorProfile?.data?.specialization}
                          </Badge>
                          <Badge
                            variant="soft"
                            size="2"
                            className="text-blueA11 ml-2"
                          >
                            <HiOutlineTranslate className="w-4 h-4 " />
                            {doctorProfile?.data?.languages &&
                              renderCommaSeparatedSpans(
                                doctorProfile.data.languages
                              )}
                          </Badge>
                          <Badge
                            variant="soft"
                            size="2"
                            className="text-cyanA11 bg-cyanA3"
                          >
                            <HiLocationMarker className="w-4 h-4" />
                            {doctorProfile?.data?.hospitalWorkPlace}
                          </Badge>
                        </Flex>

                        <Flex
                          justify="between"
                          className="flex-col md:flex-row space-x-6 w-full"
                        >
                          <GraphCard
                            count="230 Minutes"
                            text="Consultation Minutes"
                          />
                          <GraphCard count="0 Bookings" text="Bookings" />
                          <GraphCard
                            count="9 Countries"
                            text="Patient Countries"
                          />
                        </Flex>

                        <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-full bg-iris3 rounded p-4 my-5">
                          <TopAndBottomText
                            top="Completed Sessions"
                            bottom="2,349"
                          />
                          <TopAndBottomText top="Ratings" bottom="5" />
                          <TopAndBottomText top="Leaderboard" bottom="Top 10" />
                          <TopAndBottomText
                            top="Mostly Requested By"
                            bottom="Nigerians"
                          />
                        </div>

                        <Box className="p-4 border border-gray3 rounded-md">
                          <Text size="3" className="text-gray12 font-semibold">
                            Achievements
                          </Text>
                          <DocAchievement
                            date="13th February 2024"
                            awardTitle="Doctor of the year"
                            img={medalOne}
                          />
                          <DocAchievement
                            date="13th February 2024"
                            awardTitle="Doctor of the year"
                            img={medalThree}
                          />
                          <DocAchievement
                            date="13th February 2024"
                            awardTitle="Doctor of the year"
                            img={medalTwo}
                          />
                          <DocAchievement
                            date="13th February 2024"
                            awardTitle="Doctor of the year"
                            img={medalOne}
                          />
                          <DocAchievement
                            date="13th February 2024"
                            awardTitle="Doctor of the year"
                            img={medalFour}
                          />
                        </Box>
                      </Box>

                      <Box className="w-full md:w-[30%] md:ml-6 mt-10">
                        <DoctorShareProfile />
                      </Box>
                    </Flex>
                  </Tabs.Content>

                  <Tabs.Content value="reviews">
                    <Box className="mt-5">
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
                    </Box>
                  </Tabs.Content>
                </Tabs.Root>
              </Box>
            </>
          )}

          {modal && <UpdateDetails toggleModal={toggleModal} />}
        </Flex>
      )}
    </>
  );
};

export { DoctorAccountProfile };
