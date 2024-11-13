import { IoWalletOutline } from "react-icons/io5";
import { CustomText } from "./CustomText";
import headerBg from "../../assets/headerBg.svg";
import sampleImage from "../../assets/sampleImage.svg";
import CustomSelect from "./CustomSelect";
import { options } from "../../utils/data";
import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CustomInput } from "./CustomInput";
import { useNavigate } from "react-router";

type Prop = {
  ifNameAndWalletBalance?: boolean;
};

const DashboardHeader = ({ ifNameAndWalletBalance = true }: Prop) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div
      className="bg-cover bg-center px-12 py-8"
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      {ifNameAndWalletBalance && (
        <div className="flex items-center justify-between">
          <CustomText
            className="w-[139px] text-indigo_12"
            size="extraLarge"
            weight="semibold"
          >
            Hello 👋 Emmanuel
          </CustomText>

          <div className="flex items-center border border-gray_4 rounded-md p-[10px] space-x-3">
            <IoWalletOutline className="text-iris_1" />
            <CustomText size="medium" weight="medium" className="text-iris_1">
              {" "}
              Wallet Balance N0.00
            </CustomText>
          </div>
        </div>
      )}

      <div className="mt-6 bg-iris_1 p-4 rounded-lg">
        <div className="flex items-center justify-between">
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
          <img src={sampleImage} />
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <CustomSelect
            options={options}
            placeholder="Select Speciality"
            value={selectedValue}
            onValueChange={handleChange}
            ifGrayBg
          />
          <CustomSelect
            options={options}
            placeholder="Select Country"
            value={selectedValue}
            onValueChange={handleChange}
            ifGrayBg
          />
          <CustomInput
            label=""
            placeholder="Search by Availability"
            icon={<CalendarIcon />}
            className="bg-alpha_3"
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
    </div>
  );
};

export { DashboardHeader };
