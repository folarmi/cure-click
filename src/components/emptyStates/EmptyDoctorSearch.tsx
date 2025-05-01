import { Text } from "@radix-ui/themes";
import empty from "../../assets/emptyState.svg";
const EmptyDoctorSearch = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 w-full">
      <img src={empty} alt="empty State" />
      <Text weight="medium" className="text-xl text-gray12 pt-5 pb-1" as="p">
        No results found!
      </Text>
      <Text weight="regular" className="text-base text-gray11" as="p">
        We could not find anything related to your search
      </Text>
    </div>
  );
};

export { EmptyDoctorSearch };
