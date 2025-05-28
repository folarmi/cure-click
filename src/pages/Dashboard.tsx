/* eslint-disable @typescript-eslint/no-explicit-any */
import DoctorCard from "../components/cards/DoctorCard";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { CustomText } from "../components/ui/CustomText";
import { DashboardHeader } from "../components/ui/DashboardHeader";
import MeetingCardTwo from "../components/cards/MeetingCardTwo";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorDashboardHeader } from "../components/ui/DoctorDashboardHeader";
import { Flex, Text } from "@radix-ui/themes";
import { GraphCard } from "../components/cards/GraphCard";
import TopAndBottomText from "../components/atoms/TopAndBottomText";
import { NumberOfReview } from "../components/ui/NumberOfReview";
import Review from "../components/cards/Review";
import { DoctorShareProfile } from "../components/ui/DoctorShareProfile";
import { countriesData } from "../utils/data";
import MobileSlider from "../components/ui/MobileSlider";
import {
  useGetData,
  useGetDoctorProfile,
  useGetPatientProfile,
} from "../lib/apiCalls";
import { getFullName } from "../utils/util";
import { Loader } from "../components/ui/Loader";
import { useEffect, useMemo } from "react";
import { setPublicId, updateUserObject } from "../lib/features/authSlice";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { EmptyDoctorSearch } from "../components/emptyStates/EmptyDoctorSearch";
import { UpComingAppointments } from "../components/ui/UpComingAppointments";
import {
  triggerToggleCancelAppointment,
  triggerToggleMeetingCardTwo,
  triggerToggleModal,
  triggerToggleRescheduleModal,
} from "../utils/toggleFunctions";
// import { UpComingAppointments } from "../components/ui/UpComingAppointments";
// import { decodeLogin } from "../utils/util";

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { control, getValues } = useForm();
  const userType = useSelector((state: RootState) => state.auth.userType);

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const { data: doctorProfile, isLoading: doctorProfileIsLoading } =
    useGetDoctorProfile(userType === "doctor");
  const { data: patientProfileData } = useGetPatientProfile(
    userType === "patient"
  );
  const { data: doctorData, isLoading: doctorDataIsLoading } = useGetData({
    url: `appointment/api/doctors?${searchParams.toString()}&page=0&size=20`,
    queryKey: ["GetAllDoctors", searchParams.toString()],
    enabled: userType === "patient",
  });

  const { data: reviewsData, isLoading: reviewsDataIsLoading } = useGetData({
    url: `appointment/api/reviews?publicId=${doctorProfile?.data?.publicId}&page=0&size=20`,
    queryKey: ["GetDoctorsReviews"],
    enabled: userType === "doctor",
  });
  useEffect(() => {
    dispatch(
      setPublicId(
        userType === "patient"
          ? patientProfileData?.data?.publicId
          : doctorProfile?.data?.publicId
      )
    );
    dispatch(
      userType === "patient"
        ? updateUserObject(patientProfileData?.data)
        : updateUserObject(doctorProfile?.data)
    );
  }, [
    dispatch,
    doctorProfile?.data,
    doctorProfile?.data?.publicId,
    patientProfileData?.data,
    patientProfileData?.data?.publicId,
    userType,
  ]);

  return (
    <DashboardLayout ifHeader={false}>
      {userType === "patient" ? (
        <DashboardHeader
          Icon={DashboardIcon}
          routeName="Dashboard"
          control={control}
          getValues={getValues}
        />
      ) : (
        <DoctorDashboardHeader
          name={`Hello 👋  ${getFullName(
            doctorProfile?.data?.firstname,
            doctorProfile?.data?.lastname
          )}`}
          Icon={() => null}
        />
      )}

      {userType === "patient" && (
        <>
          {doctorDataIsLoading || reviewsDataIsLoading ? (
            <Loader />
          ) : (
            <section className="px-6 mt-8">
              <div className="flex items-center justify-between">
                <div className="hidden lg:block">
                  <CustomText
                    className="text-gray_12"
                    size="large"
                    weight="semibold"
                  >
                    Popular Specialist
                  </CustomText>
                  <CustomText
                    className="text-gray_11 pb-4"
                    size="medium"
                    weight="normal"
                  >
                    Most rated specialist for you
                  </CustomText>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <section className="flex flex-wrap w-full md:w-[75%] order-2 md:order-1 mt-6 lg:mt-0">
                  {doctorData?.data?.content?.length > 0 ? (
                    doctorData?.data?.content?.map((item: any) => (
                      <DoctorCard
                        key={item?.publicId}
                        image={item?.profilePictureUrl}
                        doctorName={`${getFullName(
                          item?.firstname,
                          item?.lastname
                        )}`}
                        doctorType={item?.specialization || "N/A"}
                        desc={item?.hospitalWorkPlace || "N/A"}
                        noOfSessions={3}
                        cost="$35 Per Session"
                        time="Today at 2:30pm"
                        review="5 (13 reviews)"
                        id={item?.publicId}
                      />
                    ))
                  ) : (
                    <EmptyDoctorSearch />
                  )}
                </section>

                <section className="w-full md:w-[25%] flex lg:flex-col order-1 md:order-2 -mt-16">
                  <div className="mt-12 lg:mt-0">
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
                      View your upcoming appointments
                    </CustomText>

                    <UpComingAppointments
                      toggleCancel={() =>
                        triggerToggleCancelAppointment(dispatch)
                      }
                      toggleMeetingCardTwoModal={() =>
                        triggerToggleMeetingCardTwo(dispatch)
                      }
                      toggleModal={() => triggerToggleModal(dispatch)}
                      toggleRescheduleModal={() =>
                        triggerToggleRescheduleModal(dispatch)
                      }
                    />
                  </div>
                </section>
              </div>
            </section>
          )}
        </>
      )}

      {userType === "doctor" && (
        <>
          {doctorProfileIsLoading ? (
            <Loader />
          ) : (
            <section className="mt-7 px-3 md:px-12 bg-white">
              <Text
                size="3"
                weight="medium"
                className="md:hidden text-gray12 pb-3"
              >
                Upcoming Appointments
              </Text>

              <div className="md:hidden">
                <MobileSlider />
              </div>

              <Flex className="flex-col md:flex-row">
                <div className="w-full md:w-[70%] order-2 md:order-1 bg-gray_bg">
                  <Text className="hidden md:block font-semibold" size="4">
                    Your Analytics
                  </Text>

                  <Flex className="flex-col md:flex-row mx-auto md:space-x-6">
                    <GraphCard
                      count="230 Minutes"
                      text="Consultation Minutes"
                    />
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

                  <div className="hidden md:flex p-4 items-center justify-between w-full bg-iris3 my-6">
                    <TopAndBottomText top="Completed Sessions" bottom="2,349" />
                    <TopAndBottomText top="Ratings" bottom="5" />
                    <TopAndBottomText top="Leaderboard" bottom="Top 10" />
                    <TopAndBottomText
                      top="Mostly Requested By"
                      bottom="Nigerians"
                    />
                  </div>

                  <Text
                    size="3"
                    weight="medium"
                    className="hidden md:block text-gray12 pb-3"
                  >
                    Upcoming Appointments
                  </Text>

                  <div className="hidden md:block">
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
                  </div>

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

                <div className="w-full md:w-[30%] order-1 md:order-2 md:ml-6">
                  <DoctorShareProfile />
                </div>
              </Flex>
            </section>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export { Dashboard };
