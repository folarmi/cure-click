import { Text } from "@radix-ui/themes";
import emptyState from "../../assets/emptyState01.svg";

const EmptyAppointment = () => {
  return (
    <div className="flex items-center flex-col">
      <img src={emptyState} alt="emptyState" />
      <Text as="p" weight="medium" className="text-gray12 text-xl pt-5 pb-1">
        You have no appointments
      </Text>
      <Text as="p" weight="regular" className="text-gray11 text-xl">
        When you schedule an appointment it would show here
      </Text>
    </div>
  );
};

export { EmptyAppointment };
