import { Box, Flex, Text } from "@radix-ui/themes";
import { themeData } from "../utils/data";
import UpperAndLowerText from "../components/atoms/UpperAndLowerText";
import * as Slider from "@radix-ui/react-slider";

const Preferences = () => {
  return (
    <Box className="p-6 max-w-3xl mx-auto border border-gray3 rounded-lg">
      <UpperAndLowerText
        superText="   Interface Theme"
        subText="   Select your interface theme"
      />

      <Box className="mt-6">
        <Flex justify="between" className="w-full space-x-6" align="center">
          {themeData?.map(({ id, img, text }) => {
            return (
              <Box key={id}>
                <img src={img} />
                <Text
                  as="p"
                  weight="medium"
                  size="3"
                  className="pt-6 text-tokens_colors_text"
                >
                  {text}
                </Text>
              </Box>
            );
          })}
        </Flex>

        <Box className="mt-10">
          <UpperAndLowerText
            superText="Text Size"
            subText="Make the texts more accessible to your eyes"
          />

          <Box className="mt-6">
            {/* <Slider
              defaultValue={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            /> */}
            <Slider.Root
              className="relative flex items-center w-full h-6"
              defaultValue={[50]}
              max={100}
              step={10}
              aria-label="Custom Slider"
            >
              {/* Track */}
              <Slider.Track className="relative h-2 rounded-full bg-gray-300">
                {/* Colored Section (0-50%) */}
                <div className="absolute left-0 w-[50%] h-full bg-blue-500 rounded-full" />
                {/* Greyed-out Section (50-100%) */}
                <div className="absolute left-[50%] w-[50%] h-full bg-red-300 rounded-full" />
              </Slider.Track>

              {/* Range (interactive section) */}
              <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />

              {/* Thumb (interactive handle) */}
              <Slider.Thumb className="w-4 h-4 bg-blue-500 rounded-full shadow-md" />
            </Slider.Root>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { Preferences };
