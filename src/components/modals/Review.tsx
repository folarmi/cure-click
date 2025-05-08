/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@radix-ui/themes";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { CustomTextarea } from "../ui/CustomTextArea";
import MeetingCardTwo from "../cards/MeetingCardTwo";
import { useForm } from "react-hook-form";
import { StarRating } from "../atoms/StarRating";
import { Appointment } from "../../utils/types";
import { formatAppointmentTime } from "../../utils/calendarutil";
import { getFullName } from "../../utils/util";
import { useState } from "react";
import { useCustomMutation } from "../../lib/apiCalls";
import { RootState } from "../../lib/store";
import { useAppSelector } from "../../lib/hook";

type Prop = {
  toggleModal: () => void;
  details: Appointment;
};
const Review = ({ toggleModal, details }: Prop) => {
  const { control, handleSubmit } = useForm();
  const { publicId } = useAppSelector((state: RootState) => state.auth);

  const [internalRating, setInternalRating] = useState(0);

  const reviewDoctorMutation = useCustomMutation({
    endpoint: `appointment/api/reviews`,
    successMessage: () => "Review Added sucessfully",
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    const formData = {
      appointmentPublicId: details?.publicId,
      reviewerPublicId: publicId,
      starRating: internalRating,
      message: data?.message,
    };
    // console.log(formData);
    reviewDoctorMutation.mutate(formData);
  };

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:w-[522px]">
      <AppointmentModalHeader
        text="Rate your Appointment "
        toggleModal={toggleModal}
      />

      <Box className="mt-4">
        <MeetingCardTwo
          title={details?.topic}
          date={details?.appointmentDate}
          time={formatAppointmentTime(
            details?.appointmentDate,
            details?.appointmentTime
          )}
          doctorName={getFullName(
            details?.doctor?.firstname,
            details?.doctor?.lastname
          )}
          onClick={toggleModal}
          ifButtons={false}
          ifView={false}
          ifSpaceBetween={false}
        />
        <div className="my-6">
          <StarRating
            starSize="md"
            ifSpace
            internalRating={internalRating}
            setInternalRating={setInternalRating}
          />
        </div>
        <form className="mt-6" onSubmit={handleSubmit(submitForm)}>
          <CustomTextarea
            label=""
            className=""
            placeholder="Type a Review"
            control={control}
            name="message"
            rules={{
              required: "Reason for Rescheduling is required",
            }}
          />

          <Button
            loading={reviewDoctorMutation.isPending}
            disabled={reviewDoctorMutation.isPending}
            variant="solid"
            size="3"
            className="font-medium text-white text-base bg-grass_9 w-full my-4"
          >
            Submit Review
          </Button>
        </form>
      </Box>
    </div>
  );
};

export { Review };
