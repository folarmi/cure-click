/* eslint-disable @typescript-eslint/no-explicit-any */
import MeetingCardTwo from "../cards/MeetingCardTwo";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import { Appointment } from "../../utils/types";
import { getFullName } from "../../utils/util";
import {
  formatDateToReadableString,
  formatTimeTo12Hour,
} from "../../utils/calendarutil";
import { ReportButton } from "../ui/ReportButton";
import ZegoVideoCall from "../../hooks/ZegoVideoCall";
import { useState } from "react";
import { useCustomMutation } from "../../lib/apiCalls";

type Prop = {
  toggleModal: () => void;
  selectedAppointment: Appointment;
  toggleCancel: () => void;
  toggleRescheduleTwoModal: () => void;
  toggleRescheduleModal: () => void;
};

const UpcomingAppointment = ({
  toggleModal,
  selectedAppointment,
  toggleCancel,
  toggleRescheduleModal,
}: Prop) => {
  const [inCall, setInCall] = useState(false);
  // const [roomID] = useState(
  //   () => "room_" + Math.random().toString(36).substring(2, 7)
  // );
  const [roomID, setRoomID] = useState("");
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  // const [meetingData, setMeetingData] = useState<{
  //   roomID: string | null;
  //   userID: string | null;
  //   username: string | null;
  // }>({
  //   roomID: null,
  //   userID: null,
  //   username: null
  // });

  const handleCancel = () => {
    toggleModal();
    toggleCancel();
  };

  const handleReschedule = () => {
    toggleModal();
    toggleRescheduleModal();
  };

  const startMeetingMutation = useCustomMutation({
    endpoint: `appointment/api/appointments/${selectedAppointment.publicId}/start-session`,
    method: "put",
    errorMessage: (error: any) => error?.response?.data?.message,
    onSuccessCallback: (data: any) => {
      setRoomID(data?.data?.room_id);
      setUserID(data?.data?.user_id);
      setUsername(data?.data?.username);
      setInCall(true);
    },
    onError: () => {
      toggleModal();
    },
  });

  const joinMeeting = () => {
    startMeetingMutation.mutate({});
  };

  if (inCall) {
    window.history.replaceState(null, "", `?roomID=${roomID}`);
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Zego video container */}
        <div
          style={{
            position: "absolute",
            inset: 0, // shorthand for top: 0, right: 0, bottom: 0, left: 0
          }}
        >
          <ZegoVideoCall userID={userID} username={username} />
        </div>

        {/* Leave button overlay */}
        {/* <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              setInCall(false);
              window.history.replaceState(null, "", window.location.pathname);
              toggleModal();
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ef4444",
              color: "#fff",
              borderRadius: "0.5rem",
            }}
          >
            Leave Meeting
          </button>
        </div> */}
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4 bg-white w-auto md:min-w-[522px]">
      <AppointmentModalHeader toggleModal={toggleModal} />
      <MeetingCardTwo
        title={selectedAppointment?.topic}
        date={formatDateToReadableString(selectedAppointment?.appointmentDate)}
        time={formatTimeTo12Hour(selectedAppointment?.appointmentTime)}
        doctorName={getFullName(
          selectedAppointment?.doctor?.firstname,
          selectedAppointment?.doctor?.lastname
        )}
        patientName={getFullName(
          selectedAppointment?.patient?.firstname,
          selectedAppointment?.patient?.lastname
        )}
        rescheduleOnClick={handleReschedule}
        ifView={false}
        ifSpaceBetween={false}
        ifButtons
        cancelOnClick={handleCancel}
        onClick={joinMeeting}
      />

      <AppointmentSubCard
        status={selectedAppointment?.appointmentStatus}
        date={selectedAppointment?.appointmentDate}
        time={selectedAppointment?.appointmentTime}
      />

      <ReportButton />
    </div>
  );
};

export { UpcomingAppointment };
