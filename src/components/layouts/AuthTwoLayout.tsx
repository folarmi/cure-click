import { ReactNode } from "react";
import logo from "../../assets/icons/logo.svg";
import bannerImage from "../../assets/banner.svg";
import { CustomButton } from "../ui/CustomButton";
import { useNavigate } from "react-router";
import { Flex } from "@radix-ui/themes";
import logoTwo from "../../assets/icons/logoTwo.svg";
import { CustomText } from "../ui/CustomText";

interface AuthTwoLayoutProps {
  children: ReactNode;
  mainText: string;
  subText: string;
  banner?: string;
}

const AuthTwoLayout = ({
  children,
  mainText,
  subText,
  banner = bannerImage,
}: AuthTwoLayoutProps) => {
  const navigate = useNavigate();
  return (
    <main>
      <nav className="bg-white py-5 px-16 flex items-center justify-between">
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
          </div>
        </div>
      </section>
    </main>
  );
};
// flex items-center justify-center
export { AuthTwoLayout };
