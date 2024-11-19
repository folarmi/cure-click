import { Badge } from "@radix-ui/themes";
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

type DoctorCardProp = {
  image: string;
  doctorName: string;
  doctorType: string;
  desc: string;
  noOfSessions: number;
  cost: string;
  time: string;
  review: string;
  link: string;
  cardWidth?: string;
};

const DoctorCard = ({
  image,
  doctorName,
  doctorType,
  desc,
  noOfSessions,
  cost,
  time,
  review,
  cardWidth = "318",
}: DoctorCardProp) => {
  const navigate = useNavigate();
  return (
    <div className={`mb-6 mr-6`} style={{ width: `${cardWidth}px` }}>
      <img src={image} />
      <CustomText className="text-iris_12 pt-2" size="medium" weight="semibold">
        {doctorName}
      </CustomText>

      <CustomText className="text-iris_12 pt-1" size="medium" weight="normal">
        {doctorType}
      </CustomText>
      <CustomText className="text-gray_11" size="small" weight="normal">
        {desc}
      </CustomText>

      <div className="mt-3 flex items-center justify-between">
        <Badge
          size="2"
          className="bg-alpha_3"
          variant="soft"
        >{`${noOfSessions} Available Sessions`}</Badge>
        <CustomText className="text-gray_12" size="small" weight="bold">
          {cost}
        </CustomText>
      </div>

      <div className="mt-3 bg-gray2 border border-gray_Alpha_3 p-3 rounded">
        <div className="flex items-center justify-between">
          <CustomText className="text-gray_11" size="small" weight="normal">
            Next Available
          </CustomText>
          <CustomText className="text-gray_11" size="small" weight="normal">
            Rating (Reviews)
          </CustomText>
        </div>

        <div className="flex items-center justify-between">
          <CustomText className="text-gray_12" size="small" weight="bold">
            {time}
          </CustomText>
          <div className="flex items-center">
            <StarFilledIcon className="text-orange_10 pr-1" />
            <CustomText className="text-gray_12" size="small" weight="bold">
              {review}
            </CustomText>
          </div>
        </div>
      </div>
      <CustomButton
        onClick={() => navigate("/dashboard/single-doctor/123")}
        variant="primary"
        className="mt-3 w-full"
      >
        View Specialist
      </CustomButton>
    </div>
  );
};

export default DoctorCard;
