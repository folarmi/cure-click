import { CustomText } from "../ui/CustomText";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import avatar from "../../assets/avatar.svg";
import { Button, Separator } from "@radix-ui/themes";

type Props = {
  title: string;
  date: string;
  time: string;
  doctorName: string;
  speciality: string;
  ifButtons?: boolean;
  onClick?: () => void;
  cancelOnClick?: () => void;
  rescheduleOnClick?: () => void;
};

const MeetingCard = ({
  title,
  date,
  time,
  doctorName,
  speciality,
  ifButtons = true,
  onClick,
  cancelOnClick,
  rescheduleOnClick,
}: Props) => {
  return (
    <div className="bg-iris_9 rounded-xl border border-gray_3 px-8 py-4 w-full">
      <CustomText
        weight="medium"
        size="large"
        className="text-iris_2 min-w-[270px] pb-3"
      >
        {title}
      </CustomText>

      <div className="flex items-center mb-3">
        <CalendarIcon className="text-iris_6" />
        <CustomText className="pl-3 text-iris_6" weight="normal" size="small">
          {date}
        </CustomText>
      </div>

      <div className="flex items-center mb-6">
        <ClockIcon className="text-iris_6" />
        <CustomText className="pl-3 text-iris_6" weight="normal" size="small">
          {time}
        </CustomText>
      </div>

      <div className="flex items-center">
        <img src={avatar} />
        <div className="ml-2">
          <CustomText className="text-iris_4" weight="medium" size="medium">
            {doctorName}
          </CustomText>
          <CustomText className="text-iris_5" weight="normal" size="small">
            {speciality}
          </CustomText>
        </div>
      </div>

      {ifButtons && (
        <>
          <Separator className="w-full bg-iris_8 my-5" />

          <div className="flex items-center space-x-2 whitespace-nowrap">
            <Button
              size="3"
              variant="outline"
              onClick={cancelOnClick}
              className="text-iris_3 border border-iris8 font-medium text-base cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              size="3"
              variant="outline"
              className="text-iris_3 border border-iris8"
              onClick={rescheduleOnClick}
            >
              Reschedule
            </Button>
            <Button
              onClick={onClick}
              size="3"
              variant="solid"
              className="text-iris_9 bg-iris_2 cursor-pointer"
            >
              Join
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { MeetingCard };