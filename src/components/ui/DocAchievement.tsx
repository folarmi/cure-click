import { Flex, Text } from "@radix-ui/themes";

type Prop = {
  awardTitle: string;
  date: string;
  img: string;
};
const DocAchievement = ({ awardTitle, date, img }: Prop) => {
  return (
    <Flex justify="between" align="center" className="mb-5">
      <Flex align="center">
        <img src={img} className="w-14 h-14" />
        <Text size="4" weight="medium" className="text-gray11 pl-2">
          {awardTitle}
        </Text>
      </Flex>
      <Text size="2" weight="regular" className="text-gray11">
        {date}
      </Text>
    </Flex>
  );
};

export { DocAchievement };
