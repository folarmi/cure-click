/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import * as RadixSelect from "@radix-ui/react-select";
// import {
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@radix-ui/react-icons";
// import { clsx } from "clsx";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import { Control, useController, UseControllerProps } from "react-hook-form";

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface CustomSelectProps extends RadixSelect.SelectTriggerProps {
//   options: SelectOption[];
//   placeholder?: string;
//   disabled?: boolean;
//   value?: string;
//   label?: string;
//   onValueChange?: (value: string) => void;
//   ifGrayBg?: boolean;
//   name: string;
//   control: Control<any>;
//   rules?: UseControllerProps["rules"];
//   customOnChange?: any;
//   isMulti?: boolean;
// }

// const CustomSelect: React.FC<CustomSelectProps> = ({
//   options,
//   placeholder = "Select an option",
//   // value,
//   // onValueChange,
//   disabled = false,
//   ifGrayBg = false,
//   label,
//   name,
//   control,
//   rules,
//   customOnChange,
//   isMulti = false,
//   ...rest
// }) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({ name, control, rules });

//   const selectedValues = Array.isArray(field.value) ? field.value : [];

//   return (
//     <div className="w-full">
//       {label && (
//         <LabelPrimitive.Root className="block mb-1 text-sm font-medium text-gray-700">
//           {label}
//         </LabelPrimitive.Root>
//       )}

//       <RadixSelect.Root
//         value={isMulti ? "" : field.value}
//         // onValueChange={(val) => {
//         //   customOnChange && customOnChange(val, name);
//         //   field.onChange(val);
//         // }}
//         onValueChange={(val) => {
//           let newValue: string[] = [];

//           if (isMulti) {
//             // Ensure field.value is an array
//             const selectedValues = Array.isArray(field.value)
//               ? field.value
//               : [];
//             newValue = selectedValues.includes(val)
//               ? selectedValues.filter((v) => v !== val) // Remove selected value
//               : [...selectedValues, val]; // Add new value
//           } else {
//             newValue = [val]; // Single select case
//           }

//           customOnChange && customOnChange(newValue, name);
//           field.onChange(isMulti ? newValue : val); // Corrected for multi/single mode
//         }}
//         disabled={disabled}
//       >
//         <RadixSelect.Trigger
//           className={clsx(
//             "inline-flex items-center justify-between w-full h-10 px-4 py-2 border rounded-md",
//             `border-gray-300 ${
//               ifGrayBg ? "bg-alpha_3" : "bg-white"
//             } text-sm text-gray-700 shadow-sm`,
//             "hover:bg-gray-100 focus:outline-none",
//             "disabled:opacity-50 disabled:cursor-not-allowed"
//           )}
//           {...rest}
//         >
//           <RadixSelect.Value placeholder={placeholder} />
//           <RadixSelect.Icon>
//             <ChevronDownIcon />
//           </RadixSelect.Icon>
//         </RadixSelect.Trigger>

//         <RadixSelect.Portal>
//           <RadixSelect.Content
//             className={clsx(
//               "bg-white border border-gray-300 rounded-md shadow-lg w-full max-w-md",
//               "p-1 focus:outline-none"
//             )}
//           >
//             <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 text-gray-400">
//               <ChevronUpIcon />
//             </RadixSelect.ScrollUpButton>

//             <RadixSelect.Viewport>
//               {options.map((option) => {
//                 const isSelected = selectedValues.includes(option.value);

//                 return (
//                   <RadixSelect.Item
//                     key={option.value}
//                     value={option.value}
//                     className={clsx(
//                       "flex items-center justify-between px-4 py-2 text-sm text-gray-700 rounded cursor-pointer",
//                       "hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white"
//                     )}
//                   >
//                     <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
//                     {isSelected && (
//                       <CheckIcon className="w-4 h-4 text-indigo-500" />
//                     )}
//                   </RadixSelect.Item>
//                 );
//               })}
//             </RadixSelect.Viewport>

//             <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-gray-400">
//               <ChevronDownIcon />
//             </RadixSelect.ScrollDownButton>
//           </RadixSelect.Content>
//         </RadixSelect.Portal>
//       </RadixSelect.Root>
//       {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
//     </div>
//   );
// };

// export default CustomSelect;

import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { Control, useController, UseControllerProps } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  ifGrayBg?: boolean;
  name: string;
  control: Control<any>;
  rules?: UseControllerProps["rules"];
  customOnChange?: (value: any, name: string) => void;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  disabled = false,
  ifGrayBg = false,
  label,
  name,
  control,
  rules,
  customOnChange,
  isMulti = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const handleChange = (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>
    // actionMeta: ActionMeta<SelectOption>
  ) => {
    if (isMulti) {
      const values = (newValue as MultiValue<SelectOption>).map(
        (item: { value: any }) => item.value
      );
      field.onChange(values);
      customOnChange?.(values, name);
    } else {
      const value = (newValue as SingleValue<SelectOption>)?.value || null;
      field.onChange(value);
      customOnChange?.(value, name);
    }
  };

  const getValue = () => {
    if (!field.value) return isMulti ? [] : null;

    if (isMulti) {
      return options.filter((option) =>
        (field.value as string[]).includes(option.value)
      );
    }

    return options.find((option) => option.value === field.value) || null;
  };

  return (
    <div className="w-full">
      {label && (
        <LabelPrimitive.Root className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </LabelPrimitive.Root>
      )}

      <Select
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti={isMulti}
        value={getValue()}
        onChange={handleChange}
        classNamePrefix="react-select"
        classNames={{
          control: (state: { isFocused: any }) =>
            clsx(
              "!min-h-10 !h-10 !border-gray-300 !shadow-sm !text-sm !text-gray-700",
              state.isFocused && "!border-indigo-500 !ring-1 !ring-indigo-500",
              ifGrayBg ? "!bg-alpha_3" : "!bg-white",
              disabled && "!opacity-50 !cursor-not-allowed"
            ),
          option: (state: { isSelected: any; isFocused: any }) =>
            clsx(
              "!text-sm !text-gray-700",
              state.isSelected && "!bg-indigo-500 !text-white",
              state.isFocused && !state.isSelected && "!bg-indigo-100"
            ),
          menu: () => "!border !border-gray-300 !shadow-lg !rounded-md",
          multiValue: () => "!bg-indigo-100 !rounded",
          multiValueLabel: () => "!text-indigo-800",
          multiValueRemove: () => "!text-indigo-500 hover:!bg-indigo-200",
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: ({ innerProps }) => (
            <div {...innerProps} className="pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ),
        }}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
