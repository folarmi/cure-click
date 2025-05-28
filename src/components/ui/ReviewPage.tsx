import { format } from "date-fns";
import { getFullName } from "../../utils/util";
import Review from "../cards/Review";
import { NumberOfReview } from "./NumberOfReview";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Prop = {
  reviewsData: any;
};

const ReviewPage = ({ reviewsData }: Prop) => {
  return (
    <div>
      <NumberOfReview total={reviewsData?.data?.totalElements} />

      {reviewsData?.data?.content?.map((item: any) => {
        return (
          <div key={item?.publicId} className="">
            <Review
              title={item?.message}
              numberOfRating={item?.starRating}
              paragraph={item?.message}
              name={getFullName(
                item?.appointment?.patient?.firstname,
                item?.appointment?.patient?.lastname
              )}
              date={format(new Date(item?.localDateTime), "dd/MM/yyyy")}
              time={format(new Date(item?.localDateTime), "hh:mm a")}
              ifVerticalIcon
              // ifInput
            />
          </div>
        );
      })}
    </div>
  );
};

export { ReviewPage };
