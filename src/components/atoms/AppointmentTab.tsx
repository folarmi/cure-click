import { Text } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router";

const AppointmentTab = () => {
  const tabs = [
    {
      id: 1,
      name: "Appointment History",
      route: "/dashboard/appointments",
    },
    {
      id: 2,
      name: "Appointment Calendar",
      route: "/dashboard/appointments/calendar",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex border-b border-gray3 mt-8">
      {tabs.map((item) => {
        const isActive = location.pathname === item.route;

        return (
          <div
            key={item.id}
            onClick={() => navigate(item.route)}
            className={`px-6 md:px-12 pb-2 cursor-pointer ${
              isActive ? "border-b-2 border-[#3258d3]" : ""
            }`}
          >
            <Text
              as="p"
              className={`${
                isActive
                  ? "text-neutral_12 font-medium"
                  : "text-neutral_alpha_11 font-normal"
              }`}
              size="2"
            >
              {item.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export { AppointmentTab };
