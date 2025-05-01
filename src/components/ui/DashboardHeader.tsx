/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoWalletOutline } from "react-icons/io5";
import { CustomText } from "./CustomText";
import sampleImage from "../../assets/sampleImage.svg";
import CustomSelect from "./CustomSelect";
import { sampleSpecializations } from "../../utils/data";
import { CustomButton } from "./CustomButton";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CustomInput } from "./CustomInput";
import { BackgroundHeader } from "./BackgroundHeader";
import Breadcrumb from "./BreadCrumb";
import { decodeLogin, getAllCountryOptions } from "../../utils/util";
import { useMemo } from "react";
import { useNavigate } from "react-router";

type Prop = {
  ifNameAndWalletBalance?: boolean;
  routeName: string;
  Icon: React.ComponentType<{ className?: string }>;
  control: any;
  getValues: any;
};

const DashboardHeader = ({
  ifNameAndWalletBalance = true,
  routeName,
  Icon,
  control,
  getValues,
}: Prop) => {
  const navigate = useNavigate();
  const countryOptions = useMemo(() => getAllCountryOptions(), []);

  const generateQueryString = () => {
    const rawValues = getValues();

    const filteredValues = Object.fromEntries(
      Object.entries(rawValues)
        .filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => [key, String(value)]) // cast values to string
    );

    const queryString = new URLSearchParams(filteredValues).toString();
    navigate(`/dashboard/?${queryString}`);
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
            {` Hello 👋 ${decodeLogin()?.name.split(" ")[0]}`}
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
            options={sampleSpecializations}
            placeholder="Select Speciality"
            name="specialization"
            control={control}
            ifGrayBg
            // className="hidden md:block"
          />
          <CustomSelect
            options={countryOptions}
            placeholder="Select Country"
            name="country"
            control={control}
            ifGrayBg
            // className="hidden md:block"
          />

          <CustomInput
            icon={<MagnifyingGlassIcon />}
            label=""
            placeholder="Search by Firstname"
            type="text"
            className="bg-alpha_3"
            ifGrayBg
            control={control}
            name="firstname"
          />
          <CustomInput
            label=""
            placeholder="Search by Lastname"
            icon={<CalendarIcon />}
            className="bg-alpha_3 hidden md:block"
            type="text"
            ifGrayBg
            control={control}
            name="lastname"
          />
          <CustomButton
            icon={<MagnifyingGlassIcon />}
            variant="primary"
            className="whitespace-nowrap cursor-pointer"
            onClick={generateQueryString}
          >
            Search For a Specialist
          </CustomButton>
        </div>
      </div>
    </BackgroundHeader>
  );
};

export { DashboardHeader };
