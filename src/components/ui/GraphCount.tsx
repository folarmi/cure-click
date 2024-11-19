import { Text } from "@radix-ui/themes";

interface Prop {
  text: string;
}
const GraphCount = ({ text }: Prop) => {
  return (
    <div>
      <Text size="5" className="font-semibold text-iris9">
        {text}
      </Text>
    </div>
  );
};

export { GraphCount };
