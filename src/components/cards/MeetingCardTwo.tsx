import { Button, Separator } from "@radix-ui/themes";
import { CustomText } from "../ui/CustomText";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import avatar from "../../assets/avatar.svg";

type Props = {
  title: string;
  date: string;
  time: string;
  doctorName: string;
  onClick?: () => void;
  cancelOnClick?: () => void;
  ifButtons?: boolean;
  ifView?: boolean;
};

const MeetingCardTwo = ({
  title,
  date,
  time,
  doctorName,
  onClick,
  cancelOnClick,
  ifButtons,
  ifView = true,
}: Props) => {
  return (
    <div className="py-4 px-6 border border-gray_3 rounded-xl mt-4">
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
            className="bg-gray_3 text-gray_9 cursor-pointer"
          >
            View
          </Button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
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

      <div className="flex items-center mt-6">
        <img src={avatar} />
        <div className="ml-2">
          <CustomText className="text-gray_11" weight="medium" size="medium">
            {doctorName}
          </CustomText>
        </div>
      </div>

      {ifButtons && (
        <>
          <Separator className="w-full bg-iris_8 my-5" />

          <div className="grid grid-cols-3 space-x-2 whitespace-nowrap">
            <Button
              size="3"
              variant="outline"
              onClick={cancelOnClick}
              // onClick={() => console.log("sfs")}
              className="text-iris9 border border-iris8 font-medium text-base cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              size="3"
              variant="outline"
              className="text-iris9 border border-iris8"
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
