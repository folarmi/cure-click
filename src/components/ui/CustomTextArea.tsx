/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx"; // optional for handling conditional classes
import { useController, UseControllerProps } from "react-hook-form";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

const CustomTextarea: React.FC<TextareaProps> = ({
  label,
  className,
  icon,
  name,
  control,
  rules,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Label Component */}
      <LabelPrimitive.Root className="text-base font-medium text-text">
        {label}
      </LabelPrimitive.Root>

      <div className="relative flex items-start">
        {icon && (
          <div className="absolute pointer-events-none pl-2 pt-2">{icon}</div>
        )}

        <textarea
          className={clsx(
            "w-full p-2 text-sm outline-none border rounded-md border-alpha_9/[12.6%] bg-white/90 transition-all placeholder:text-alpha_9 placeholder:pl-6",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            icon && "pl-8" // Adjust padding if icon is present
          )}
          id={name}
          {...field}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};

export { CustomTextarea };
