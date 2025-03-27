import { Button, Flex, Text } from "@radix-ui/themes";
import { StarRating } from "../atoms/StarRating";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { CustomTextarea } from "../ui/CustomTextArea";
import { BiSend } from "react-icons/bi";
import avatar from "../../assets/avatar.svg";
import { useForm } from "react-hook-form";

type Prop = {
  title: string;
  name: string;
  date: string;
  time: string;
  reviewerName?: string;
  numberOfRating: number;
  ifVerticalIcon?: boolean;
  paragraph: string;
  ifInput?: boolean;
  ifReply?: boolean;
  ifResponse?: boolean;
};
const Review = ({
  paragraph,
  title,
  numberOfRating,
  name,
  date,
  time,
  reviewerName,
  ifVerticalIcon = false,
  ifInput = false,
  ifReply = false,
  ifResponse = false,
}: Prop) => {
  const { control } = useForm();
  return (
    <Flex direction="column" className="bg-white p-4 mt-4">
      <Flex align="center" justify="between">
        <Text as="p" size="3" className="text-gray12 font-semibold">
          {title}
        </Text>
        <Flex align="center">
          <StarRating rating={numberOfRating} />
          {ifVerticalIcon && <DotsVerticalIcon className="w-6 h-6 ml-4" />}
        </Flex>
      </Flex>
      <Text as="p" size="3" weight="regular" className="pt-2 text-gray11">
        {paragraph}
      </Text>

      <Flex align="center" className={`mt-3 ${ifResponse && "mb-3"}`}>
        <Text size="2" className="font-semibold text-gray12 pr-4">
          {name}
        </Text>
        <Text size="2" weight="regular" className="text-gray12">
          {date} ||
        </Text>
        <Text size="2" weight="regular" className="text-gray12">
          {time}
        </Text>
      </Flex>

      {ifInput && (
        <Flex className="mt-5">
          <CustomTextarea
            control={control}
            name="biography"
            label=""
            placeholder="input reply here"
          />
          <Flex
            align="center"
            className="bg-grass9 p-[10px] w-11 h-11 rounded-lg ml-3"
          >
            <BiSend className="text-white w-6 h-6" />
          </Flex>
        </Flex>
      )}

      {ifReply && (
        <Button
          size="2"
          style={{
            border: "1px solid var(--border-gray)",
          }}
          className="text-neutral_12 font-medium text-sm s mt-4 w-[59px] bg-white rounded"
        >
          Reply
        </Button>
      )}

      {ifResponse && (
        <div className="border-t border-t-gray3 pt-4 ">
          <section className="pl-2 md:pl-6">
            <Text as="p" size="3" weight="regular" className="pt-2 text-gray11">
              After being forced to move twice within five years, our customers
              had a hard time finding us and our sales plummeted. The Lorem
              Ipsum Co. not only revitalized our brand, but saved our nearly
              100-year-old family business from the brink of ruin by optimizing
              our website for search and creating our Google My Business
              listing.
            </Text>

            <Flex
              align="center"
              justify="between"
              className={`mt-3 flex-col md:flex-row`}
            >
              <Flex align="center">
                <img src={avatar} className="mr-3" />
                <Text size="2" className="font-semibold text-gray12 pr-4">
                  {reviewerName}
                </Text>
                <Text size="2" weight="regular" className="text-gray12">
                  {date} ||
                </Text>
                <Text size="2" weight="regular" className="text-gray12">
                  {time}
                </Text>
              </Flex>

              <Button
                size="2"
                style={{
                  border: "1px solid var(--border-gray)",
                }}
                className="text-error_9 text-sm font-medium bg-white rounded"
              >
                <TrashIcon className="w-4 h-4" />
                Delete your Comment
              </Button>
            </Flex>
          </section>
          <Button
            size="2"
            style={{
              border: "1px solid var(--border-gray)",
            }}
            className="text-neutral_12 font-medium text-sm  mt-4 w-[59px] bg-white rounded"
          >
            Reply
          </Button>
        </div>
      )}
    </Flex>
  );
};

export default Review;
