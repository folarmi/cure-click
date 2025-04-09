/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Checkbox from "@radix-ui/react-checkbox";
import { useController, Control } from "react-hook-form";

interface RHFCheckboxProps {
  name: string;
  control: Control<any>;
}

const CustomCheckBox: React.FC<RHFCheckboxProps> = ({ name, control }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <Checkbox.Root
      checked={!!value}
      onCheckedChange={(val) => onChange(!!val)}
      className="w-5 h-5 border rounded data-[state=checked]:bg-red-500"
    >
      <Checkbox.Indicator className="text-white">✓</Checkbox.Indicator>
    </Checkbox.Root>
  );
};

export { CustomCheckBox };
