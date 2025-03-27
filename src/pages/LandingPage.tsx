import { Text } from "@radix-ui/themes";
import { AuthTwoLayout } from "../components/layouts/AuthTwoLayout";
import { CustomButton } from "../components/ui/CustomButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType } from "../lib/features/authSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  return (
    <AuthTwoLayout
      authQuestion="New On Cure Click?"
      callToAction="Welcome to Cure Click"
      mainText="Welcome to Cure Click"
      subText="Your reliable platform for second opinion medical consultation"
    >
      <div className="flex flex-col gap-y-4 mx-8">
        <Link to="/register">
          <CustomButton
            variant="primary"
            className="w-full"
            onClick={() => dispatch(setUserType("doctor"))}
          >
            I am a Consultant
          </CustomButton>
        </Link>

        <Link to="/register">
          <CustomButton
            variant="primary"
            className="w-full"
            onClick={() => dispatch(setUserType("patient"))}
          >
            I need a Consultation
          </CustomButton>
        </Link>

        <Link to="/login">
          <Text as="p" size="2" align="center" className="font-medium pt-2">
            Have an Account? <span className="text-grass_9">Login Here</span>
          </Text>
        </Link>

        <Text align="center" className="text-gray_11 font-medium pb-8" size="2">
          Copyrights CureClick 2024
        </Text>
      </div>
    </AuthTwoLayout>
  );
};

export { LandingPage };
