import { ReactNode } from "react";
import logo from "../../assets/icons/logo.svg";
import bannerImage from "../../assets/banner.svg";
import { CustomButton } from "../ui/CustomButton";
import { useNavigate } from "react-router";
import { Flex, Text } from "@radix-ui/themes";
import logoTwo from "../../assets/icons/logoTwo.svg";
import { CustomText } from "../ui/CustomText";

interface AuthTwoLayoutProps {
  children: ReactNode;
  mainText: string;
  subText: string;
  banner?: string;
  authQuestion: string;
  callToAction: string;
}

const AuthTwoLayout = ({
  children,
  mainText,
  subText,
  banner = bannerImage,
  callToAction,
  authQuestion,
}: AuthTwoLayoutProps) => {
  const navigate = useNavigate();
  return (
    <main>
      <nav className="bg-white py-5 px-4 md:px-16 hidden md:flex items-center justify-between">
        <img src={logo} alt="cureClick" />
        <CustomButton
          variant="primary"
          className=""
          onClick={() => navigate("/")}
        >
          New On Cure Click? Create an Account
        </CustomButton>
      </nav>

      <section
        className="relative bg-cover bg-center h-[345px]"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center mt-20">
          <div className="bg-white shadow-auth-shadow  rounded-md max-w-md w-full mx-auto">
            <Flex direction="column" align="center" className="mt-6">
              <img src={logoTwo} className="w-9 text-2xl" />
              <CustomText
                size="largeTwo"
                weight="semibold"
                className={`text-text`}
              >
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
                {authQuestion}
                <span className="text-grass_9">{callToAction}</span>
              </Text>
              <Text className="text-gray_11 font-medium" size="2">
                Copyrights CureClick 2024
              </Text>
            </Flex>
          </div>
        </div>
      </section>
    </main>
  );
};

export { AuthTwoLayout };
