/* eslint-disable @typescript-eslint/no-explicit-any */
import { Callout } from "@radix-ui/themes";

type Prop = {
  text: string;
  bgColor: string;
  style?: any;
};

const CallOut = ({ bgColor, text }: Prop) => {
  return (
    <div>
      <Callout.Root
        style={{
          backgroundColor: bgColor,
        }}
        className={`${bgColor}`}
      >
        <Callout.Icon></Callout.Icon>
        <Callout.Text className="text-grass12">{text}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default CallOut;
