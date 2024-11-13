import { Text } from "@radix-ui/themes";

type Prop = {
  superText: string;
  subText: string;
};
const UpperAndLowerText = ({ subText, superText }: Prop) => {
  return (
    <div>
      <Text as="p" size="4" className="font-semibold text-gray12">
        {superText}
      </Text>
      <Text as="p" size="3" weight="regular" className="text-gray11 pt-1">
        {subText}
      </Text>
    </div>
  );
};

export default UpperAndLowerText;
