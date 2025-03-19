/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import { clsx } from "clsx"; // optional for handling conditional classes
// // import { TextField } from "@radix-ui/themes";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   error?: string;
//   className?: string;
//   icon?: React.ReactNode;
//   ifGrayBg?: boolean;
// }

// const CustomInput: React.FC<InputProps> = ({
//   label,
//   error,
//   className,
//   icon,
//   ifGrayBg,
//   ...props
// }) => {
//   return (
//     <div className={`flex flex-col  w-full ${className}`}>
//       {/* Label Component */}
//       <LabelPrimitive.Root
//         // htmlFor={id}
//         className="text-base font-medium text-text"
//       >
//         {label}
//       </LabelPrimitive.Root>

//       <div className="relative flex items-center">
//         {icon && (
//           <div className="absolute pointer-events-none pl-2">{icon}</div>
//         )}

//         <input
//           className={clsx(
//             `w-full p-2 text-sm outline-none border rounded-md border-alpha_9/[12.6%] ${
//               ifGrayBg ? "bg-alpha_3" : "bg-white/90"
//             } transition-all placeholder:text-alpha_9 placeholder:pl-6`,
//             error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
//           )}
//           {...props}
//         />
//       </div>

//       {/* Error Message */}
//       {error && <span className="text-xs text-red-500">{error}</span>}
//     </div>
//   );
// };

// export { CustomInput };

import * as React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  icon?: React.ReactNode;
  ifGrayBg?: boolean;
  onlyNumbers?: boolean;
  rightIcon?: React.ReactNode;
  ifRightIcon?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  icon,
  ifGrayBg,
  onlyNumbers = false,
  className,
  rightIcon,
  ifRightIcon,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = onlyNumbers ? value.replace(/\D/g, "") : value;
    field.onChange(parsedValue);
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <LabelPrimitive.Root
        htmlFor={name}
        className="text-base font-medium text-text"
      >
        {label}
      </LabelPrimitive.Root>

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute pointer-events-none pl-2">{icon}</div>
        )}

        <input
          id={name}
          className={clsx(
            `w-full p-2 text-sm outline-none border rounded-md border-alpha_9/[12.6%] ${
              ifGrayBg ? "bg-alpha_3" : "bg-white/90"
            } transition-all placeholder:text-alpha_9 placeholder:pl-2`,
            error
              ? "focus:ring-red-500 focus:outline-primary focus:outline-offset-4"
              : "border-gray-300"
          )}
          {...field}
          {...props}
          value={field.value || ""}
          onChange={handleChange}
          inputMode={onlyNumbers ? "numeric" : "text"}
          pattern={onlyNumbers ? "[0-9]*" : undefined}
        />

        {ifRightIcon && (
          <div className="absolute pointer-events-none right-0 pr-3">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-normal text-[#E5484D] pt-3">
          {error.message}
        </span>
      )}
    </div>
  );
};

export { CustomInput };
