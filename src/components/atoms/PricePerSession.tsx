import { Text } from "@radix-ui/themes";

const PricePerSession = () => {
  return (
    <div>
      <Text as="p" className="font-semibold" size="6">
        $750
        <Text weight="regular" size="4" className="pl-2">
          Per session
        </Text>
      </Text>
    </div>
  );
};

export default PricePerSession;
