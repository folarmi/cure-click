import { Callout } from "@radix-ui/themes";

type Prop = {
  text: string;
  bgColor: string;
};

const CallOut = ({ bgColor, text }: Prop) => {
  return (
    <div>
      <Callout.Root className={`${bgColor} my-4`}>
        <Callout.Icon></Callout.Icon>
        <Callout.Text className="text-grass12">{text}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default CallOut;
