import { StarFilledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

const NumberOfReview = () => {
  return (
    <Flex align="center" justify="between" className="bg-white p-4 mt-4">
      <Text as="p" size="3" className="text-gray12 font-semibold">
        24 Reviews
      </Text>
      <Flex align="center">
        <Text as="p" size="3" className="text-gray12">
          4.0
        </Text>
        <StarFilledIcon className="text-orange_10" />
        <StarFilledIcon className="text-orange_10" />
        <StarFilledIcon className="text-orange_10" />
        <StarFilledIcon className="text-orange_10" />
        <StarFilledIcon className="text-gray4" />
      </Flex>
    </Flex>
  );
};

export { NumberOfReview };
