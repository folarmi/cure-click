import { StarFilledIcon } from "@radix-ui/react-icons";

type Prop = {
  rating?: number;
  maxRating?: number;
  starSize?: "sm" | "md" | "lg";
  onRate?: (rating: number) => void;
  setInternalRating?: (rating: number) => void;
  ifSpace?: boolean;
  internalRating?: number;
};

function StarRating({
  rating: controlledRating,
  maxRating = 5,
  starSize = "sm",
  onRate,
  ifSpace = false,
  internalRating,
  setInternalRating,
}: Prop) {
  // Use controlled value if provided, otherwise internal state
  const rating = (controlledRating ?? internalRating) as number;

  const sizeClass = {
    sm: "w-[18px] h-[18px]",
    md: "w-[33px] h-[33px]",
    lg: "w-6 h-6",
  }[starSize];

  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const baseClass = `cursor-pointer transition-colors ${sizeClass} ${
      i <= rating ? "text-orange_10" : "text-gray4"
    }`;

    stars.push(
      <StarFilledIcon
        key={i}
        className={baseClass}
        onClick={() => {
          // if (controlledRating == null) setInternalRating(i); // Don't update state if controlled
          if (controlledRating === undefined && setInternalRating) {
            setInternalRating(i);
          }
          if (onRate) onRate(i);
        }}
      />
    );
  }

  return (
    <div className={`flex ${ifSpace ? "justify-between" : "space-x-1"}`}>
      {stars}
    </div>
  );
}

export { StarRating };
