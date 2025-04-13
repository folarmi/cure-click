import { Text } from "@radix-ui/themes";
import { getCurrencySymbol } from "../../utils/util";

type Prop = {
  price: string;
  currency: string;
};

const PricePerSession = ({ currency, price }: Prop) => {
  return (
    <div>
      <Text as="p" className="font-semibold" size="6">
        {`${getCurrencySymbol(currency || "NAIRA")} ${price || "0"}`}
        <Text weight="regular" size="4" className="pl-2">
          Per session
        </Text>
      </Text>
    </div>
  );
};

export default PricePerSession;
