import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CustomInput } from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { sampleSpecializations } from "../../utils/data";
import { useForm } from "react-hook-form";
import { getAllCountryOptions } from "../../utils/util";
import { useMemo } from "react";

const Filter = () => {
  const { control } = useForm();
  const countryOptions = useMemo(() => getAllCountryOptions(), []);

  return (
    <div className="w-full flex items-center space-x-4">
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
    </div>
  );
};

export { Filter };
