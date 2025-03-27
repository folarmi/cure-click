import { Box, Button } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import CustomSelect from "../components/ui/CustomSelect";
import { options } from "../utils/data";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorAccountProfile } from "./DoctorAccountProfile";
import { useForm } from "react-hook-form";

const AccountProfile = () => {
  const { control } = useForm();
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <>
      {userType === "patient" ? (
        <Box className="p-6 max-w-3xl mx-auto border border-gray3 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput label="First name" control={control} name="firstname" />
          <CustomInput label="Last name" control={control} name="lastname" />
          <CustomInput label="Email" control={control} name="email" />
          <CustomSelect
            options={options}
            placeholder="Thursday, 5th February 2024"
            name="availabilityStatus"
            control={control}
          />
          <CustomInput
            label="Phone Number"
            control={control}
            name="phoneNumber"
          />
          <CustomSelect
            options={options}
            placeholder="Thursday, 5th February 2024"
            name="availabilityStatus"
            control={control}
          />

          <Button
            size="3"
            className="md:hidden bg-grass_9 font-medium text-base cursor-pointer"
          >
            Save
          </Button>
        </Box>
      ) : (
        <DoctorAccountProfile />
      )}
    </>
  );
};

export default AccountProfile;
