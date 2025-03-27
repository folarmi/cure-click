// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { clsx } from "clsx";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "danger" | "ghost";
//   size?: "sm" | "md" | "lg";
//   icon?: React.ReactNode;
//   asChild?: boolean;
// }

// const CustomButton: React.FC<ButtonProps> = ({
//   variant = "primary",
//   size = "md",
//   icon,
//   asChild = false,
//   className,
//   children,
//   ...props
// }) => {
//   const Comp = asChild ? Slot : "button"; // Enables using the Button with custom components like `Link`

//   return (
//     <Comp
//       className={clsx(
//         "inline-flex items-center justify-center font-medium transition-all rounded-md focus:outline-none",
//         {
//           "bg-grass_9 text-white hover:bg-primary-dark": variant === "primary",
//           "bg-secondary text-neutral_11 hover:bg-white/80 border border-neutral_8/[27.45%] bg-white/80":
//             variant === "secondary",
//           "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
//             variant === "danger",
//           "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500":
//             variant === "ghost",
//         },
//         {
//           "px-2.5 py-1.5 text-xs": size === "sm",
//           "px-4 py-2 text-sm": size === "md",
//           "px-6 py-3 text-base": size === "lg",
//         },
//         className
//       )}
//       {...props}
//     >
//       {icon && (
//         <span className={clsx(children ? "mr-2" : "", "inline-flex")}>
//           {icon}
//           {/* <img src={icon} alt="" /> */}
//         </span>
//       )}
//       {children}
//     </Comp>
//   );
// };

// export { CustomButton };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  asChild?: boolean;
  isLoading?: boolean; // Added `isLoading` prop
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  asChild = false,
  className,
  children,
  isLoading = false, // Default to `false`
  disabled = false,
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
        className,
        {
          "opacity-50 cursor-not-allowed": isLoading || disabled, // Add loading and disabled state styles
        }
      )}
      disabled={isLoading || disabled} // Disable the button if it's loading or already disabled
      {...props}
    >
      {isLoading && (
        <span className="mr-2 inline-flex">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeOpacity="0.25"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12a8 8 0 1 1 8 8"
            />
          </svg>
        </span>
      )}
      {icon && !isLoading && (
        <span className={clsx(children ? "mr-2" : "", "inline-flex")}>
          {icon}
        </span>
      )}
      {!isLoading && children}
    </Comp>
  );
};

export { CustomButton };
