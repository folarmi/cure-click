import { Box, Button } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import CustomSelect from "../components/ui/CustomSelect";
import { options } from "../utils/data";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { DoctorAccountProfile } from "./DoctorAccountProfile";

const AccountProfile = () => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return (
    <>
      {userType === "patient" ? (
        <Box className="p-6 max-w-3xl mx-auto border border-gray3 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput label="First name" />
          <CustomInput label="Last name" />
          <CustomInput label="Email" />
          <CustomSelect
            options={options}
            placeholder="Thursday, 5th February 2024"
          />
          <CustomInput label="Phone Number" />
          <CustomSelect
            options={options}
            placeholder="Thursday, 5th February 2024"
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
