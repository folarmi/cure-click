import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  asChild?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  asChild = false,
  className,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : "button"; // Enables using the Button with custom components like `Link`

  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none",
        {
          "bg-grass_9 text-white hover:bg-primary-dark": variant === "primary",
          "bg-secondary text-neutral_11 hover:bg-white/80 border border-neutral_8/[27.45%] bg-white/80":
            variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "danger",
          "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500":
            variant === "ghost",
        },
        {
          "px-2.5 py-1.5 text-xs": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {icon && (
        <span className={clsx(children ? "mr-2" : "", "inline-flex")}>
          {icon}
          {/* <img src={icon} alt="" /> */}
        </span>
      )}
      {children}
    </Comp>
  );
};

export { CustomButton };
