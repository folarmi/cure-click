import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx"; // optional for handling conditional classes
// import { TextField } from "@radix-ui/themes";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
  ifGrayBg?: boolean;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  error,
  className,
  icon,
  ifGrayBg,
  ...props
}) => {
  return (
    <div className={`flex flex-col  w-full ${className}`}>
      {/* Label Component */}
      <LabelPrimitive.Root
        // htmlFor={id}
        className="text-base font-medium text-text"
      >
        {label}
      </LabelPrimitive.Root>

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute pointer-events-none pl-2">{icon}</div>
        )}

        <input
          className={clsx(
            `w-full p-2 text-sm outline-none border rounded-md border-alpha_9/[12.6%] ${
              ifGrayBg ? "bg-alpha_3" : "bg-white/90"
            } transition-all placeholder:text-alpha_9 placeholder:pl-6`,
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          )}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export { CustomInput };
