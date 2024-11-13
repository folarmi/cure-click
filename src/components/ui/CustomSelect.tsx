import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps extends RadixSelect.SelectTriggerProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  ifGrayBg?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  disabled = false,
  ifGrayBg = false,
  ...rest
}) => (
  <RadixSelect.Root
    value={value}
    onValueChange={onValueChange}
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
          {options.map((option) => (
            <RadixSelect.Item
              key={option.value}
              value={option.value}
              className={clsx(
                "px-4 py-2 text-sm text-gray-700 rounded cursor-pointer",
                "hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white"
              )}
            >
              <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-gray-400">
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);

export default CustomSelect;
