import { Text } from "@radix-ui/themes";

interface Prop {
  text: string;
  lowerText: string;
}

const GraphTitle = ({ text, lowerText }: Prop) => {
  return (
    <div>
      <Text as="p" weight="medium" size="3" className="text-gray12 pb-1">
        {text}
      </Text>
      <Text as="p" size="2" weight="regular" className="text-gray11">
        {lowerText}
      </Text>
    </div>
  );
};

export { GraphTitle };
