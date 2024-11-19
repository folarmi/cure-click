import { Box, Button, Flex, Text } from "@radix-ui/themes";

interface Prop {
  balance: string;
  title: string;
  ifButton?: boolean;
  buttonText?: string;
  ifFull?: boolean;
  className?: string;
}

const WalletHeader = ({
  balance,
  title,
  ifButton = true,
  ifFull = false,
  buttonText = "Deposit",
  className,
}: Prop) => {
  return (
    <Flex
      align="center"
      justify="between"
      className={`${className} bg-iris12 rounded-lg p-6 ${
        ifFull ? "w-full" : "w-[40%]"
      }`}
    >
      <Box>
        <Text size="3" as="p" weight="regular" className=" text-iris3 pb-1">
          {title}
        </Text>
        <Text size="7" as="p" className=" text-iris2 font-semibold">
          {balance}
        </Text>
      </Box>

      {ifButton && (
        <Button size="3" className="bg-grass9 font-semibold" variant="solid">
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};

export { WalletHeader };
