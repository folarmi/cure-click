/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { clsx } from "clsx";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Control, useController, UseControllerProps } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps extends RadixSelect.SelectTriggerProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  ifGrayBg?: boolean;
  name: string;
  control: Control<any>;
  rules?: UseControllerProps["rules"];
  customOnChange?: any;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  // value,
  // onValueChange,
  disabled = false,
  ifGrayBg = false,
  label,
  name,
  control,
  rules,
  customOnChange,
  isMulti = false,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const selectedValues = Array.isArray(field.value) ? field.value : [];

  return (
    <div className="w-full">
      {label && (
        <LabelPrimitive.Root className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </LabelPrimitive.Root>
      )}

      <RadixSelect.Root
        value={isMulti ? "" : field.value}
        // onValueChange={(val) => {
        //   customOnChange && customOnChange(val, name);
        //   field.onChange(val);
        // }}
        onValueChange={(val) => {
          let newValue: string[] = [];

          if (isMulti) {
            // Ensure field.value is an array
            const selectedValues = Array.isArray(field.value)
              ? field.value
              : [];
            newValue = selectedValues.includes(val)
              ? selectedValues.filter((v) => v !== val) // Remove selected value
              : [...selectedValues, val]; // Add new value
          } else {
            newValue = [val]; // Single select case
          }

          customOnChange && customOnChange(newValue, name);
          field.onChange(isMulti ? newValue : val); // Corrected for multi/single mode
        }}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          className={clsx(
            "inline-flex items-center justify-between w-full h-10 px-4 py-2 border rounded-md",
            `border-gray-300 ${
              ifGrayBg ? "bg-alpha_3" : "bg-white"
            } text-sm text-gray-700 shadow-sm`,
            "hover:bg-gray-100 focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          {...rest}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={clsx(
              "bg-white border border-gray-300 rounded-md shadow-lg w-full max-w-md",
              "p-1 focus:outline-none"
            )}
          >
            <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 text-gray-400">
              <ChevronUpIcon />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    className={clsx(
                      "flex items-center justify-between px-4 py-2 text-sm text-gray-700 rounded cursor-pointer",
                      "hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white"
                    )}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                    {isSelected && (
                      <CheckIcon className="w-4 h-4 text-indigo-500" />
                    )}
                  </RadixSelect.Item>
                );
              })}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-gray-400">
              <ChevronDownIcon />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
