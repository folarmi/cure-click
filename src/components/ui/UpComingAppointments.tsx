import { format, parse } from "date-fns";
import {
  formatAppointmentTime,
  sortUpcomingAppointments,
} from "../../utils/calendarutil";
import { Appointment } from "../../utils/types";
import { getFullName } from "../../utils/util";
import { MeetingCard } from "../cards/MeetingCard";
import MeetingCardTwo from "../cards/MeetingCardTwo";
import { Text } from "@radix-ui/themes";
import { useGetData } from "../../lib/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

type Prop = {
  toggleModal: () => void;
  toggleCancel: () => void;
  toggleRescheduleModal: () => void;
  toggleMeetingCardTwoModal: () => void;
};

const UpComingAppointments = ({
  toggleCancel,
  toggleModal,
  toggleRescheduleModal,
  toggleMeetingCardTwoModal,
}: Prop) => {
  const { publicId } = useSelector((state: RootState) => state.auth);

  const { data: appointmentsData } = useGetData({
    url: `appointment/api/appointments?patient=${publicId}&page=0&size=20&sort=DESC`,
    queryKey: ["GetAllAppointments"],
  });

  const sortedAppointments = sortUpcomingAppointments(
    appointmentsData?.data?.content
  );
  // const sortedAppointments = [];
  // console.log(appointmentsData?.data?.content);

  return (
    <div>
      {sortedAppointments?.[0] === undefined ? (
        <Text as="p" weight="regular" className="text-gray11 text-xl">
          You have no upcoming appointments
        </Text>
      ) : (
        <>
          <MeetingCard
            title={sortedAppointments?.[0]?.topic}
            date={sortedAppointments?.[0]?.appointmentDate}
            time={formatAppointmentTime(
              sortedAppointments?.[0]?.appointmentDate,
              sortedAppointments?.[0]?.appointmentTime
            )}
            doctorName={getFullName(
              sortedAppointments?.[0]?.doctor?.firstname,
              sortedAppointments?.[0]?.doctor?.lastname
            )}
            patientName={getFullName(
              sortedAppointments?.[0]?.patient?.firstname,
              sortedAppointments?.[0]?.patient?.lastname
            )}
            speciality={sortedAppointments?.[0]?.doctor?.specialization}
            onClick={toggleModal}
            cancelOnClick={toggleCancel}
            rescheduleOnClick={toggleRescheduleModal}
          />

          {sortedAppointments?.slice(1).map((item: Appointment) => {
            return (
              <div key={item?.publicId}>
                <MeetingCardTwo
                  title={item?.topic}
                  date={item?.appointmentDate}
                  time={format(
                    parse(item?.appointmentTime, "HH:mm:ss", new Date()),
                    "h:mm a"
                  )}
                  doctorName={getFullName(
                    item?.doctor?.firstname,
                    item?.doctor?.lastname
                  )}
                  onClick={toggleMeetingCardTwoModal}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export { UpComingAppointments };
