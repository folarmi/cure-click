import DashboardLayout from "../components/layouts/DashboardLayout";
import medalOne from "../assets/medalOne.svg";
import medalTwo from "../assets/medalTwo.svg";
import medalFour from "../assets/medalFour.svg";
import medalThree from "../assets/medalThree.svg";
import sampleDoctor from "../assets/sampleDoctorOne.svg";
import BadgeIcon from "../assets/icons/Badge.svg";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { IoBriefcaseOutline } from "react-icons/io5";
import { HiOutlineTranslate } from "react-icons/hi";
import TopAndBottomText from "../components/atoms/TopAndBottomText";
import { DashboardIcon } from "@radix-ui/react-icons";
import Review from "../components/cards/Review";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import Availability from "../components/modals/Availability";
import { PaymentBox } from "../components/ui/PaymentBox";
import Breadcrumb from "../components/ui/BreadCrumb";
import { BackgroundHeader } from "../components/ui/BackgroundHeader";
import { NumberOfReview } from "../components/ui/NumberOfReview";
import {
  useGetData,
  useGetDoctorAvailableSessions,
  useGetSingleDoctorData,
} from "../lib/apiCalls";
import { useParams } from "react-router";
import { Loader } from "../components/ui/Loader";
import {
  capitalize,
  getFullName,
  renderCommaSeparatedSpans,
} from "../utils/util";
import { DoctorCalendar } from "../components/ui/DoctorCalendar";
import { RootState } from "../lib/store";
import { useSelector } from "react-redux";
import { DefaultProfile } from "../components/ui/DefaultProfile";
import { getFirstAndLastInitials } from "../utils/randomUtil";

const SingleDoctor = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const { data: singleDoctorData, isLoading: singleDoctorDataIsLoading } =
    useGetSingleDoctorData(userType === "patient", id || "");
  const { data: doctorAvailableSessions } = useGetDoctorAvailableSessions(id);

  const { data: reviewsData, isLoading: reviewsDataIsLoading } = useGetData({
    url: `appointment/api/reviews?doctorPublicId=${id}&page=0&size=20`,
    queryKey: ["GetDoctorsReviews"],
  });
  console.log(reviewsData);
  const toggleModal = () => {
    setModal(!modal);
  };

  const scheduleData = {
    ...doctorAvailableSessions?.data,
    date: doctorAvailableSessions?.date,
    // date: doctorAvailableSessions?.lastModifiedDate,
  };

  return (
    <>
      {singleDoctorDataIsLoading || reviewsDataIsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout ifHeader={false}>
          <BackgroundHeader
            ifDoctor
            className="relative h-full hidden md:block"
          >
            <Breadcrumb
              Icon={DashboardIcon}
              route={`Find a Specialist / ${getFullName(
                singleDoctorData?.data?.firstname,
                singleDoctorData?.data?.lastname
              )}`}
            />
          </BackgroundHeader>

          <div className="md:flex gap-x-4 md:space-x-0 md:px-[50px] bg-gray_bg">
            <section className="w-full px-4 md:px-0 md:w-[25%]">
              {singleDoctorData?.data?.profilePictureUrl ? (
                <Box className="w-[100px] h-[100px] relative rounded-lg">
                  <img
                    src={
                      singleDoctorData?.data?.profilePictureUrl || sampleDoctor
                    }
                    className="w-[100px] h-[100px] object-cover rounded-lg absolute md:-top-6"
                  />
                </Box>
              ) : (
                <DefaultProfile
                  size="w-16 h-16"
                  initials={getFirstAndLastInitials(
                    singleDoctorData?.data?.firstname,
                    singleDoctorData?.data?.lastname
                  )}
                />
              )}

              <Flex align="center" className="">
                <Text
                  as="p"
                  size="7"
                  weight="medium"
                  className="text-indigo_12"
                >
                  {getFullName(
                    singleDoctorData?.data?.firstname,
                    singleDoctorData?.data?.lastname
                  )}
                </Text>
                <img src={BadgeIcon} className="w-[34px] h-[34px]" />
              </Flex>

              <Flex>
                <Badge variant="soft" size="2" className="text-accent_alpha_11">
                  <IoBriefcaseOutline className="w-4 h-4 " />
                  {singleDoctorData?.data?.specialization || "N/A"}
                </Badge>
                <Badge variant="soft" size="2" className="text-blueA11 ml-2">
                  <HiOutlineTranslate className="w-4 h-4 " />
                  {(singleDoctorData?.data?.languages &&
                    renderCommaSeparatedSpans(
                      singleDoctorData.data.languages
                    )) ||
                    "N/A"}
                </Badge>
              </Flex>

              <Box className="mt-3">
                <Badge
                  variant="soft"
                  size="2"
                  className="text-cyanA11 bg-cyanA3"
                >
                  <HiOutlineTranslate className="w-4 h-4 " />
                  {singleDoctorData?.data?.hospitalWorkPlace || "N/A"}
                </Badge>
              </Box>

              <Flex
                align="center"
                justify="between"
                className="mt-3 border border-gray2 p-4"
              >
                <Text size="2" className="text-gray11">
                  {singleDoctorData?.data?.yearsOfExperience || "0"} years
                  Experience
                </Text>
                <Text size="2" className="text-gray11">
                  {capitalize(singleDoctorData?.data?.gender) || "N/A"}
                </Text>
                <Text size="2" className="text-gray11">
                  {singleDoctorData?.data?.gender === "MALE"
                    ? "He/Him"
                    : "She/Her"}
                </Text>
              </Flex>

              <Text
                size="3"
                weight="regular"
                className="text-gray9 text-justify"
              >
                {singleDoctorData?.data?.biography}
              </Text>
            </section>

            <section className="hidden md:block w-[50%] mt-20">
              <Box className="bg-iris3 p-4">
                <Text size="3" weight="medium" className="text-gray12">
                  Analytics
                </Text>

                <div className="flex items-center justify-between w-full">
                  <TopAndBottomText top="Completed Sessions" bottom="2,349" />
                  <TopAndBottomText top="Ratings" bottom="5" />
                  <TopAndBottomText top="Leaderboard" bottom="Top 10" />
                  <TopAndBottomText
                    top="Mostly Requested By"
                    bottom="Nigerians"
                  />
                </div>
              </Box>

              <NumberOfReview />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
              />
              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
              />
            </section>

            <section className="md:hidden px-4">
              <Flex className="gap-4 my-4">
                <Badge size="3">Availability</Badge>
                <Badge size="3" className="text-gray9 bg-neutral_alpha_3">
                  Reviews
                </Badge>
                <Badge className="text-gray9 bg-neutral_alpha_3" size="3">
                  Analytics
                </Badge>
              </Flex>

              <Text className="text-gray12" size="3" weight="medium">
                Availability
              </Text>

              <TopAndBottomText
                className="bg-iris3 p-4 my-4"
                top="Available Sessions"
                bottom="24"
              />
            </section>

            <section className="w-full md:w-[25%] md:mt-20 px-4 md:px-0">
              <div className="mt-4 border border-gray_Alpha_3 rounded-lg overflow-hidden px-4 py-6">
                <DoctorCalendar
                  scheduleData={scheduleData}
                  singleDoctorData={singleDoctorData}
                  ifPrice
                />
              </div>
              {/* 
              <PaymentBox
                toggleModal={toggleModal}
                className="hidden md:block mt-4"
                price={singleDoctorData?.data?.pricing}
                currency={singleDoctorData?.data?.currency}
              /> */}

              <Box className="bg-white p-4 border border-gray3 mt-4">
                <Text weight="medium" size="3">
                  Achievements
                </Text>

                <Flex
                  align="center"
                  justify="between"
                  className="w-full flex-wrap"
                >
                  <img src={medalOne} />
                  <img src={medalTwo} />
                  <img src={medalThree} />
                  <img src={medalFour} />
                  <img src={medalOne} />
                  <img src={medalTwo} />
                  <img src={medalThree} />
                  <img src={medalFour} />
                </Flex>
              </Box>
            </section>

            <section className="md:hidden px-4 mt-4">
              <Text className="text-gray12" size="3" weight="medium">
                Availability
              </Text>

              <Flex wrap="wrap" className="gap-y-4">
                <TopAndBottomText
                  className="bg-iris3 w-1/2 p-4 mr-4"
                  top="Completed Sessions"
                  bottom="2,349"
                />
                <TopAndBottomText
                  className="bg-iris3 w-1/2 p-4"
                  top="Ratings"
                  bottom="5"
                />
                <TopAndBottomText
                  className="bg-iris3 w-1/2 p-4"
                  top="Leaderboard"
                  bottom="Top 5"
                />
                <TopAndBottomText
                  className="bg-iris3 w-1/2 p-4"
                  top="Mostly Requested By"
                  bottom="Nigerians"
                />
              </Flex>

              <Text className="text-gray12" size="3" weight="medium">
                Reviews
              </Text>

              <NumberOfReview />
              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
              />

              <Review
                title="Review Title"
                numberOfRating={4}
                paragraph="After being forced to move twice within five years, our customers had a hard time finding us and our sales plummeted. The Lorem Ipsum Co. not only revitalized our brand, but saved our nearly 100-year-old family business from the brink of ruin by optimizing our website for search and creating our Google My Business listing."
                name="John Doe"
                date="25/10/2023"
                time="10:59 am"
              />

              <PaymentBox
                price={singleDoctorData?.data?.pricing}
                currency={singleDoctorData?.data?.currency}
                toggleModal={toggleModal}
                className=" md:hidden"
              />
            </section>
          </div>

          <Modal show={modal} toggleModal={toggleModal}>
            <div className="p-4">
              <Availability toggleModal={toggleModal} />
            </div>
          </Modal>
        </DashboardLayout>
      )}
    </>
  );
};

export { SingleDoctor };
