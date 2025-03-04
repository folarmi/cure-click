import { Flex } from "@radix-ui/themes";
import { GraphCount } from "../ui/GraphCount";
import { GraphTitle } from "../ui/GraphTitle";
import { ReactNode } from "react";
// import { ReactNode } from "react";

interface Prop {
  count: string;
  text: string;
  children?: ReactNode;
}

const GraphCard = ({ text, count, children }: Prop) => {
  return (
    <div className="mt-6 border border-gray3 rounded-xl p-4 w-[318px] h-[236px] overflow-y-scroll">
      <Flex justify="between">
        <GraphCount text={count} />
        <GraphTitle text={text} lowerText="This Month" />
      </Flex>
      {children}
    </div>
  );
};

export { GraphCard };
