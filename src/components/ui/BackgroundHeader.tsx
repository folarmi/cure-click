import { ReactNode } from "react";
import headerBg from "../../assets/headerBg.svg";

interface Prop {
  children: ReactNode;
  className?: string;
}

const BackgroundHeader = ({ children, className }: Prop) => {
  return (
    <div
      className={`bg-cover bg-center px-4 md:px-12 py-8 h-fit ${className}`}
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      {children}
    </div>
  );
};

export { BackgroundHeader };
