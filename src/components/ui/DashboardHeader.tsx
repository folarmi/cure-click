import { IoWalletOutline } from "react-icons/io5";
import { CustomText } from "./CustomText";
import sampleImage from "../../assets/sampleImage.svg";
import CustomSelect from "./CustomSelect";
import { options } from "../../utils/data";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CustomInput } from "./CustomInput";
import { useNavigate } from "react-router";
import { BackgroundHeader } from "./BackgroundHeader";
import Breadcrumb from "./BreadCrumb";

type Prop = {
  ifNameAndWalletBalance?: boolean;
  routeName: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const DashboardHeader = ({
  ifNameAndWalletBalance = true,
  routeName,
  Icon,
}: Prop) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <BackgroundHeader>
      <Breadcrumb Icon={Icon} route={routeName} />
      {ifNameAndWalletBalance && (
        <div className="flex items-center justify-between">
          <CustomText
            className="w-[139px] text-indigo_12"
            size="extraLarge"
            weight="semibold"
          >
            Hello 👋 Emmanuel
          </CustomText>

          <div className="flex items-center border border-gray4 rounded-md p-[10px] space-x-3">
            <IoWalletOutline className="text-iris1" />
            <CustomText
              size="medium"
              weight="medium"
              className="hidden md:block text-iris1"
            >
              {" "}
              Wallet Balance N0.00
            </CustomText>
            <CustomText
              size="medium"
              weight="medium"
              className=" md:hidden text-iris1"
            >
              {" "}
              N0.00
            </CustomText>
          </div>
        </div>
      )}

      <div className="mt-6 bg-iris1 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <section>
            <CustomText
              className="text-gray_12 pb-1"
              weight="semibold"
              size="large"
            >
              Schedule an Appointment
            </CustomText>
            <CustomText
              className="text-gray_11 pb-1"
              weight="normal"
              size="medium"
            >
              +2k Vetted doctors are waiting to have a conversation with you
            </CustomText>
          </section>
          <img src={sampleImage} className="w-1/2 md:w-auto mt-4 md:mt-0" />
        </div>

        <div className="mt-4 hidden md:flex items-center space-x-4">
          <CustomSelect
            options={options}
            placeholder="Select Speciality"
            value={selectedValue}
            onValueChange={handleChange}
            ifGrayBg
            // className="hidden md:block"
          />
          <CustomSelect
            options={options}
            placeholder="Select Country"
            value={selectedValue}
            onValueChange={handleChange}
            ifGrayBg
            // className="hidden md:block"
          />
          <CustomInput
            label=""
            placeholder="Search by Availability"
            icon={<CalendarIcon />}
            className="bg-alpha_3 hidden md:block"
            type="text"
            ifGrayBg
          />
          <CustomInput
            icon={<MagnifyingGlassIcon />}
            label=""
            placeholder="Search Workplace"
            type="text"
            className="bg-alpha_3"
            ifGrayBg
          />
          <CustomButton
            icon={<MagnifyingGlassIcon />}
            variant="primary"
            className="whitespace-nowrap cursor-pointer"
            onClick={() => navigate("/dashboard/results")}
          >
            Search For a Specialist
          </CustomButton>
        </div>
      </div>
    </BackgroundHeader>
  );
};

export { DashboardHeader };
