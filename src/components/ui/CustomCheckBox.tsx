/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Checkbox from "@radix-ui/react-checkbox";
import { Text } from "@radix-ui/themes";
import { useController, Control } from "react-hook-form";

interface RHFCheckboxProps {
  name: string;
  control: Control<any>;
  text: string;
  onClick?: () => void;
}

const CustomCheckBox: React.FC<RHFCheckboxProps> = ({
  name,
  control,
  text,
  onClick,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <label className="flex items-center cursor-pointer" onClick={onClick}>
      <Checkbox.Root
        checked={!!value}
        onCheckedChange={(val) => onChange(!!val)}
        className="w-5 h-5 border rounded data-[state=checked]:bg-grass9"
      >
        <Checkbox.Indicator className="text-white">✓</Checkbox.Indicator>
      </Checkbox.Root>
      <Text size="2" className="text-text pl-2" weight="regular" as="p">
        {text}
      </Text>
    </label>
  );
};

export { CustomCheckBox };
