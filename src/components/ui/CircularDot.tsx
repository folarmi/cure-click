import { Box } from "@radix-ui/themes";

interface Prop {
  bgColor: string;
}

const CircularDot = ({ bgColor }: Prop) => {
  return (
    <Box
      style={{
        backgroundColor: bgColor,
      }}
      className={`w-2 h-2 rounded-full`}
    ></Box>
  );
};

export { CircularDot };
