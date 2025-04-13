import { ReactNode } from "react";
import headerBg from "../../assets/blueBg.svg";
import doctors from "../../assets/doctors.svg";

interface Prop {
  children: ReactNode;
  className?: string;
  ifDoctor?: boolean;
}

const BackgroundHeader = ({ children, className, ifDoctor }: Prop) => {
  return (
    <div
      className={`relative ${
        ifDoctor && "h-[178px]"
      } bg-cover bg-center px-4 md:px-12 py-8 overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      {/* Children content */}
      <div className="relative z-10">{children}</div>

      {/* Doctors Image - Properly clipped by container */}
      {ifDoctor && (
        <div
          className="absolute right-0 bottom-0 -mr-6"
          style={{ bottom: "-40%" }}
        >
          <img
            src={doctors}
            className="h-auto object-contain"
            alt="Doctors"
            style={{ transform: "translateY(30%)" }}
          />
        </div>
      )}
    </div>
  );
};

export { BackgroundHeader };
