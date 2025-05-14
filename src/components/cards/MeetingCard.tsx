import { CustomText } from "../ui/CustomText";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import avatar from "../../assets/avatar.svg";
import { Box, Separator, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { MeetingButton } from "../ui/MeetingCardButton";

type Props = {
  title: string;
  date: string;
  time: string;
  doctorName?: string;
  patientName?: string;
  speciality: string | null;
  ifButtons?: boolean;
  ifModal?: boolean;
  ifPending?: boolean;
  onClick?: () => void;
  cancelOnClick?: () => void;
  acceptOnClick?: () => void;
  rescheduleOnClick?: () => void;
  joinOnClick?: () => void;
  cancelLoading?: boolean;
  acceptLoading?: boolean;
  acceptDisabled?: boolean;
  rescheduleLoading?: boolean;
  joinLoading?: boolean;
  joinDisabled?: boolean;
  cancelDisabled?: boolean;
  rescheduleDisbaled?: boolean;
};

const MeetingCard = ({
  title,
  date,
  time,
  doctorName,
  patientName,
  speciality,
  ifButtons = true,
  ifModal = false,
  // onClick,
  cancelOnClick,
  rescheduleOnClick,
  acceptOnClick,
  joinOnClick,
  ifPending = false,
  acceptLoading,
  cancelLoading,
  joinLoading,
  rescheduleLoading,
  joinDisabled,
  acceptDisabled,
  cancelDisabled,
  rescheduleDisbaled,
}: Props) => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <div
      className={`bg-[var(--color-primary)] rounded-xl border border-gray3 px-8 py-4 ${
        ifModal ? "w-full" : "w-auto md:w-[366px]"
      }`}
    >
      <CustomText
        weight="medium"
        size="large"
        className="text-iris2 min-w-[270px] pb-3"
      >
        {title}
      </CustomText>

      <div className="flex items-center mb-3">
        <CalendarIcon className="text-[var(--meeting-card-date)]" />
        <Text
          size="2"
          weight="regular"
          className="pl-3 text-[var(--meeting-card-date)]"
        >
          {date}
        </Text>
      </div>

      <div className="flex items-center mb-6">
        <ClockIcon className="text-[var(--meeting-card-date)]" />
        <Text
          size="2"
          weight="regular"
          className="pl-3 text-[var(--meeting-card-date)]"
        >
          {time}
        </Text>
      </div>

      {userType === "patient" && (
        <div className="flex items-center">
          <img src={avatar} />
          <div className="ml-2">
            <CustomText className="text-iris4" weight="medium" size="medium">
              {doctorName}
            </CustomText>
            <CustomText className="text-iris5" weight="normal" size="small">
              {speciality}
            </CustomText>
          </div>
        </div>
      )}

      {userType === "doctor" && (
        <Box className="my-6">
          <Text as="p" className="text-grass5" size="2" weight="regular">
            Patient
          </Text>
          <Text as="p" className="text-grass4" size="3" weight="medium">
            {patientName}
          </Text>
        </Box>
      )}

      {ifButtons && (
        <>
          <Separator className="w-full bg-[var(--meeting-card-divider-color)] my-5" />

          <div className="flex items-center justify-between space-x-2 whitespace-nowrap">
            {/* <Button
              size="3"
              style={{
                border: "1px solid var(--meeting-card-divider-color)",
              }}
              onClick={cancelOnClick}
              loading={cancelLoading}
              disabled={cancelLoading}
              className={`text-var(--meeting-card-button-color) bg-transparent font-medium text-base cursor-pointer ${
                ifModal ? "min-w-[125px]" : "w-fit"
              }`}
            >
              Cancel
            </Button> */}
            <MeetingButton
              onClick={cancelOnClick}
              loading={cancelLoading}
              disabled={cancelDisabled || cancelLoading}
              variant="outline"
              ifModal={ifModal}
              style={{
                border: "1px solid var(--meeting-card-divider-color)",
              }}
            >
              Cancel
            </MeetingButton>

            {ifPending ? (
              // <Button
              //   onClick={acceptOnClick}
              //   size="3"
              //   variant="solid"
              //   loading={acceptLoading}
              //   disabled={acceptDisabled}
              //   className={`text-[var(--color-primary)] bg-iris2 cursor-pointer ${
              //     ifModal ? "min-w-[125px]" : "w-fit"
              //   }`}
              // >
              //   Accept
              // </Button>
              <MeetingButton
                onClick={acceptOnClick}
                loading={acceptLoading}
                disabled={acceptDisabled || acceptLoading}
                variant="solid"
                ifModal={ifModal}
              >
                {acceptLoading ? "Accepting..." : "Accept"}
              </MeetingButton>
            ) : (
              // <Button
              //   size="3"
              //   loading={rescheduleLoading}
              //   disabled={rescheduleLoading}
              //   style={{
              //     border: "1px solid var(--meeting-card-divider-color)",
              //   }}
              //   className="text-var(--meeting-card-button-color) bg-transparent"
              //   onClick={rescheduleOnClick}
              // >
              //   Reschedule
              // </Button>
              <MeetingButton
                onClick={rescheduleOnClick}
                loading={rescheduleLoading}
                disabled={rescheduleDisbaled || rescheduleLoading}
                variant="outline"
                ifModal={ifModal}
                style={{
                  border: "1px solid var(--meeting-card-divider-color)",
                }}
              >
                {rescheduleLoading ? "Rescheduling..." : "Reschedule"}
              </MeetingButton>
            )}

            <MeetingButton
              onClick={joinOnClick}
              loading={joinLoading}
              disabled={joinDisabled || joinLoading}
              variant="solid"
              ifModal={ifModal}
            >
              {joinLoading ? "Joining..." : "Join"}
            </MeetingButton>
          </div>
        </>
      )}
    </div>
  );
};

export { MeetingCard };
