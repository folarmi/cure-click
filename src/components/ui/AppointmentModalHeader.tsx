import { Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";

type Prop = {
  text?: string;
  toggleModal: () => void;
};

const AppointmentModalHeader = ({
  toggleModal,
  text = "Appointment Details",
}: Prop) => {
  return (
    <div>
      {" "}
      <Flex justify="between" align="center">
        <Text as="p" className="font-semibold text-gray12" size="4">
          {text}
        </Text>
        <BiX onClick={toggleModal} className="cursor-pointer" />
      </Flex>
    </div>
  );
};

export default AppointmentModalHeader;
