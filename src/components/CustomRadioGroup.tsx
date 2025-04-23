import * as RadioGroup from "@radix-ui/react-radio-group";

interface Option {
  label: string;
  value: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
  className?: string;
}

export const CustomRadioGroup = ({
  options,
  value,
  onValueChange,
  name,
  className,
}: CustomRadioGroupProps) => {
  return (
    <RadioGroup.Root
      className={`flex flex-col gap-4  ${className}`}
      value={value}
      onValueChange={onValueChange}
      name={name}
    >
      {options.map((option, idx) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          id={`${name}-${idx}`}
          asChild
        >
          <label
            htmlFor={`${name}-${idx}`}
            className="flex items-center justify-between gap-2 cursor-pointer w-full p-3 border rounded-md 
        border-neutral_alpha_6 text-neutral_alpha_12 font-medium text-sm
        data-[state=checked]:border-neutral_alpha_6 data-[state=checked]:text-neutral_alpha_9 data-[state=checked]:bg-neutral_3"
          >
            <span>{option.label}</span>
            <span
              className="bg-white w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
        data-[state=checked]:border-blue-600"
            >
              <RadioGroup.Indicator className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            </span>
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
