import { Text } from "@radix-ui/themes";

type Prop = {
  top: string;
  bottom: string;
  className?: string;
};

const TopAndBottomText = ({ top, bottom, className }: Prop) => {
  return (
    <div className={`${className}`}>
      <Text as="p" size="2" weight="medium">
        {top}
      </Text>
      <Text as="p" size="2" weight="regular" className="text-gray11">
        {bottom}
      </Text>
    </div>
  );
};

export default TopAndBottomText;
