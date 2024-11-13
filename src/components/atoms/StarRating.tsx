/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarFilledIcon } from "@radix-ui/react-icons";

function StarRating({ rating, maxRating = 5 }: any) {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      i <= rating ? (
        <StarFilledIcon key={i} className="text-orange_10" />
      ) : (
        <StarFilledIcon key={i} className="text-gray4" />
      )
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
}

export { StarRating };
