import React, { ReactNode } from "react";
import { CustomText } from "../ui/CustomText";
import { Box, Flex, Text } from "@radix-ui/themes";
import logo from "../../assets/icons/logo.svg";
import { onboardingSteps } from "../../utils/data";
import { CustomButton } from "../ui/CustomButton";
import { useLocation, useNavigate } from "react-router";
import logoTwo from "../../assets/icons/logoTwo.svg";
// import bannerImage from "../../assets/banner.svg";

interface AuthLayoutProps {
  children: ReactNode;
  mainText: string;
  subText: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  mainText,
  subText,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex>
      <Box className="w-[30%] bg-iris3 h-screen pl-16 pt-6 hidden md:block">
        <img src={logo} className="w-28" />

        <section className="mt-24">
          {onboardingSteps.map(({ id, img, subText, title, link }) => {
            const isActive = location.pathname === link;
            return (
              <Flex
                key={id}
                direction="row"
                mb="40px"
                onClick={() => navigate(link)}
                className="cursor-pointer"
              >
                <img src={img} className="w-10 h-10 mr-[10px]" />
                <Box>
                  <CustomText
                    size="large"
                    weight="semibold"
                    className={`${isActive ? "text-text" : "text-gray_10"}`}
                  >
                    {title}
                  </CustomText>
                  <CustomText
                    size="medium"
                    weight="normal"
                    className={`${isActive ? "text-gray_11" : "text-gray9"}`}
                  >
                    {subText}
                  </CustomText>
                </Box>
              </Flex>
            );
          })}
        </section>

        <CustomText
          size="small"
          weight="medium"
          className={`text-center text-gray_11 pt-auto`}
        >
          Copyrights CureClick 2024
        </CustomText>
      </Box>
      <Box className="w-full md:w-[70%]">
        <div className="hidden md:flex w-full">
          <CustomButton
            variant="secondary"
            className="ml-auto flex w-[240px] mt-5 mr-16 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Have an Account? Login Here
          </CustomButton>
        </div>
        {/* 
        <section
          className="relative bg-cover bg-center h-[345px]"
          style={{ backgroundImage: `url(${bannerImage})` }}
        > */}
        <Flex direction="column" align="center" className="mt-12">
          <img src={logoTwo} className="w-9 text-2xl" />
          <CustomText size="largeTwo" weight="semibold" className={`text-text`}>
            {mainText}
          </CustomText>
          <CustomText
            size="medium"
            weight="normal"
            className={`text-gray_11 w-[336px] text-center pb-8`}
          >
            {subText}
          </CustomText>
        </Flex>
        {children}
        <Flex
          className="md:hidden px-4 my-6"
          direction="column"
          align="center"
          justify="center"
        >
          <Text as="p" size="2" className="font-medium pb-4">
            Have an Account? <span className="text-grass_9">Login Here</span>
          </Text>
          <Text className="text-gray_11 font-medium" size="2">
            Copyrights CureClick 2024
          </Text>
        </Flex>
        {/* </section> */}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
