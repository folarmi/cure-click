import React, { ReactNode } from "react";
import { CustomText } from "../ui/CustomText";
import { Box, Flex } from "@radix-ui/themes";
import logo from "../../assets/icons/logo.svg";
import { onboardingSteps } from "../../utils/data";
import { CustomButton } from "../ui/CustomButton";
import { useLocation, useNavigate } from "react-router";
import logoTwo from "../../assets/icons/logoTwo.svg";

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
      <Box className="w-[30%] bg-iris_3 h-screen pl-16 pt-6">
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
                    className={`${isActive ? "text-gray_11" : "text-gray_9"}`}
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
      <Box className="w-[70%]">
        <div className="flex w-full">
          <CustomButton
            variant="secondary"
            className="ml-auto flex w-[240px] mt-5 mr-16 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Have an Account? Login Here
          </CustomButton>
        </div>

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
      </Box>
    </Flex>
  );
};

export default AuthLayout;