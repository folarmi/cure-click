import { Box, Button, Separator, Text } from "@radix-ui/themes";
import { CustomText } from "../ui/CustomText";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import avatar from "../../assets/avatar.svg";
import { RootState } from "../../lib/store";
import { useSelector } from "react-redux";

type Props = {
  title: string;
  date: string;
  time: string;
  doctorName?: string;
  patientName?: string;
  onClick?: () => void;
  cancelOnClick?: () => void;
  rescheduleOnClick?: () => void;
  ifButtons?: boolean;
  ifView?: boolean;
  ifDocDetails?: boolean;
  ifSpaceBetween?: boolean;
};

const MeetingCardTwo = ({
  title,
  date,
  time,
  doctorName,
  patientName,
  onClick,
  cancelOnClick,
  rescheduleOnClick,
  ifButtons,
  ifView = true,
  ifDocDetails = true,
  ifSpaceBetween = true,
}: Props) => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <div className="py-4 px-6 border border-gray3 rounded-xl mt-4">
      <div className="flex justify-between">
        <CustomText
          weight="medium"
          size="large"
          className="text-gray_12 min-w-[203px]"
        >
          {title}
        </CustomText>
        {ifView && (
          <Button
            size="2"
            onClick={onClick}
            variant="solid"
            className="bg-gray3 text-gray9 cursor-pointer"
          >
            View
          </Button>
        )}
      </div>

      <div
        className={`mt-3 flex items-center  ${
          ifSpaceBetween ? "justify-between" : "space-x-3"
        }`}
      >
        <div className="flex items-center">
          <CalendarIcon className="text-gray_11" />
          <CustomText
            className="pl-3 text-gray_11"
            weight="normal"
            size="small"
          >
            {date}
          </CustomText>
        </div>
        <div className="flex items-center">
          <ClockIcon className="text-gray_11" />
          <CustomText
            className="pl-3 text-gray_11"
            weight="normal"
            size="small"
          >
            {time}
          </CustomText>
        </div>
      </div>

      {userType === "doctor" && (
        <Box className="my-6">
          <Text as="p" className="text-gray10" size="2" weight="regular">
            Patient
          </Text>
          <Text as="p" className="text-gray11" size="3" weight="medium">
            {patientName}
          </Text>
        </Box>
      )}

      {ifDocDetails && userType === "patient" && (
        <div className="flex items-center mt-6">
          <img src={avatar} />
          <div className="ml-2">
            <CustomText className="text-gray_11" weight="medium" size="medium">
              {doctorName}
            </CustomText>
          </div>
        </div>
      )}

      {ifButtons && (
        <>
          <Separator
            className={`w-full my-5 ${
              userType === "patient" ? "bg-iris8" : "bg-gray2"
            }`}
          />

          <div className="grid grid-cols-3 space-x-2 whitespace-nowrap">
            <Button
              size="3"
              style={{
                border: "1px solid var(--meeting-card-two-border-color)",
              }}
              onClick={cancelOnClick}
              className={`font-medium text-base cursor-pointer bg-white ${
                userType === "patient" ? "text-iris8" : "text-neutral_9"
              }`}
            >
              Cancel
            </Button>
            <Button
              size="3"
              onClick={rescheduleOnClick}
              style={{
                border: "1px solid var(--meeting-card-two-border-color)",
              }}
              className={`${
                userType === "patient" ? "text-iris8" : "text-neutral_9"
              } font-medium text-base cursor-pointer bg-white`}
            >
              Reschedule
            </Button>
            <Button
              onClick={onClick}
              size="3"
              variant="solid"
              className="text-white bg-grass9 cursor-pointer"
            >
              Join
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MeetingCardTwo;
