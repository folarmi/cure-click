import { Badge } from "@radix-ui/themes";
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getInitials } from "../../utils/randomUtil";

type DoctorCardProp = {
  image: string;
  doctorName: string;
  doctorType: string;
  desc: string;
  noOfSessions: number;
  cost: string;
  time: string;
  review: string;
  link?: string;
  cardWidth?: string;
  id?: string;
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
  id,
}: DoctorCardProp) => {
  return (
    <div className={`mb-6 mr-6`} style={{ width: `${cardWidth}px` }}>
      {/* <div className="w-[318px] h-[172px] overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          alt="Doctor Profile Image"
        />
      </div> */}
      <div
        className="relative w-[318px] h-[172px] bg-gray2 overflow-hidden rounded-lg flex items-center justify-center"
        role="img"
        aria-label={image ? "Doctor profile photo" : "Doctor profile initials"}
      >
        {image ? (
          <img
            src={image}
            alt="Doctor Profile Image"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <span className="text-4xl font-semibold text-gray10 z-10">
            {getInitials(doctorName)}
          </span>
        )}
      </div>

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
      <Link to={`/dashboard/single-doctor/${id}`}>
        <CustomButton variant="primary" className="mt-3 w-full">
          View Specialist
        </CustomButton>
      </Link>
    </div>
  );
};

export default DoctorCard;
