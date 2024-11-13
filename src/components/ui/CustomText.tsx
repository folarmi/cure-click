import * as React from "react";
import { Text as RadixText } from "@radix-ui/themes";
import clsx from "clsx";

interface CustomTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "extraLarge" | "largeTwo";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: string;
  className?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  size = "medium",
  weight = "normal",
  color = "text-black",
  className,
  ...props
}) => {
  const baseStyle = clsx(
    {
      "text-sm": size === "small",
      "text-base": size === "medium",
      "text-lg": size === "large",
      "text-2xl": size === "extraLarge",
      "text-[28px]": size === "largeTwo",
      "font-light": weight === "light",
      "font-normal": weight === "normal",
      "font-medium": weight === "medium",
      "font-semibold": weight === "semibold",
      "font-bold": weight === "bold",
    },
    color,
    className
  );

  return (
    <RadixText as="p" className={baseStyle} {...props}>
      {children}
    </RadixText>
  );
};

export { CustomText };
