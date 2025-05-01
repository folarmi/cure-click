/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  type?: string;
  icon?: React.ReactNode;
  ifGrayBg?: boolean;
  onlyNumbers?: boolean;
  rightIcon?: React.ReactNode;
  ifRightIcon?: boolean;
  disabled?: boolean;
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
  type,
  disabled = false,
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

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
            } transition-all placeholder:text-alpha_9 ${
              icon && "placeholder:pl-6 pl-8"
            } placeholder:text-sm placeholder:font-normal ${
              disabled &&
              "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:text-gray-500 disabled:hover:bg-gray-100"
            }  `,
            error
              ? "focus:ring-red-500 focus:outline-[#ed9b9d] focus:outline-offset-4"
              : "border-gray-300"
          )}
          {...field}
          {...props}
          disabled={disabled}
          value={field.value || ""}
          type={
            onlyNumbers
              ? "number"
              : type === "password" && showPassword
              ? "text"
              : type
          }
          onChange={handleChange}
          inputMode={onlyNumbers ? "numeric" : "text"}
          pattern={onlyNumbers ? "[0-9]*" : undefined}
        />

        {type === "password" && !onlyNumbers && (
          <div
            className="absolute left-[90%] top-3 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        )}

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
