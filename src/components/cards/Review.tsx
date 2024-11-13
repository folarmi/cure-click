import { Flex, Text } from "@radix-ui/themes";
import { StarRating } from "../atoms/StarRating";

type Prop = {
  title: string;
  name: string;
  date: string;
  time: string;
  numberOfRating: number;
  paragraph: string;
};
const Review = ({
  paragraph,
  title,
  numberOfRating,
  name,
  date,
  time,
}: Prop) => {
  return (
    <Flex direction="column" className="bg-white p-4 mt-4">
      <Flex align="center" justify="between">
        <Text as="p" size="3" className="text-gray12 font-semibold">
          {title}
        </Text>
        <Flex align="center">
          <StarRating rating={numberOfRating} />
        </Flex>
      </Flex>
      <Text as="p" size="3" weight="regular" className="pt-2 text-gray11">
        {paragraph}
      </Text>

      <Flex align="center" className="mt-3">
        <Text size="2" className="font-semibold text-gray12 pr-4">
          {name}
        </Text>
        <Text size="2" weight="regular" className="text-gray12">
          {date} ||
        </Text>
        <Text size="2" weight="regular" className="text-gray12">
          {time}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Review;
