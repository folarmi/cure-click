import { ReactNode } from "react";
import Sidebar from "../ui/Sidebar";
import bannerThree from "../../assets/bannerThree.svg";

interface DashboardLayoutProps {
  children: ReactNode;
  ifHeader?: boolean;
}
const DashboardLayout = ({
  children,
  ifHeader = true,
}: DashboardLayoutProps) => {
  return (
    <div>
      <Sidebar />
      {ifHeader && (
        <div
          className="bg-cover bg-center px-12 py-8"
          style={{ backgroundImage: `url(${bannerThree})` }}
        ></div>
      )}
      {children}
    </div>
  );
};

export default DashboardLayout;
