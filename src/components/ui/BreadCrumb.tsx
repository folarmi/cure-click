/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

type Prop = {
  route: any;
};

const Breadcrumb = ({ route }: Prop) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center w-fit space-x-2 bg-iris2 py-2 px-3 rounded-lg"
    >
      <Flex align="center">
        <DashboardIcon className="pr-1 w-5 h-5 " />
        <Link to="/dashboard" className="text-gray10 font-medium">
          Dashboard
        </Link>
      </Flex>
      <span className="text-gray-400">/</span>
      {route.split("/").map((item: string, index: number, arr: any) => (
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
          {/* Add a slash after each item except the last one */}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
