import { Box } from "@radix-ui/themes";
import { CustomInput } from "../components/ui/CustomInput";
import CustomSelect from "../components/ui/CustomSelect";
import { options } from "../utils/data";

const AccountProfile = () => {
  return (
    <Box className="p-6 max-w-3xl mx-auto border border-gray3 rounded-lg grid grid-cols-2 gap-4">
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
    </Box>
  );
};

export default AccountProfile;
