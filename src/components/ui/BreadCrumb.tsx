/* eslint-disable @typescript-eslint/no-explicit-any */

import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

type Prop = {
  route: any;
  Icon: React.ComponentType<{ className?: string }>;
};

const Breadcrumb = ({ Icon, route }: Prop) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center w-fit space-x-2 bg-iris2 py-2 px-3 rounded-lg"
    >
      <Flex align="center">
        <Icon className="pr-1 w-5 h-5 " />
        {route.split("/").map((item: string, index: number, arr: string[]) => (
          <span key={index}>
            <Link
              to={`/${item}`}
              className={
                index === arr.length - 1
                  ? "text-gray12 font-medium"
                  : "text-gray10 font-medium"
              }
            >
              {item}
            </Link>
            {index !== arr.length - 1 && "/"}{" "}
          </span>
        ))}
      </Flex>
    </nav>
  );
};

export default Breadcrumb;
