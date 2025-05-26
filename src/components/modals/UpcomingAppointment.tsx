/* eslint-disable @typescript-eslint/no-explicit-any */
import MeetingCardTwo from "../cards/MeetingCardTwo";
import AppointmentModalHeader from "../ui/AppointmentModalHeader";
import { AppointmentSubCard } from "../ui/AppointmentSubCard";
import { Appointment } from "../../utils/types";
import { decodeLogin, getFullName } from "../../utils/util";
import {
  formatDateToReadableString,
  formatTimeTo12Hour,
} from "../../utils/calendarutil";
import { ReportButton } from "../ui/ReportButton";
import ZegoVideoCall from "../../hooks/ZegoVideoCall";
import { useState } from "react";
import { useCustomMutation } from "../../lib/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";

type Prop = {
  toggleModal: () => void;
  selectedAppointment: Appointment;
  toggleCancel: () => void;
  // toggleRescheduleTwoModal: () => void;
  toggleRescheduleModal: () => void;
};

const UpcomingAppointment = ({
  toggleModal,
  selectedAppointment,
  toggleCancel,
  toggleRescheduleModal,
}: Prop) => {
  const { publicId, userType } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [inCall, setInCall] = useState(false);

  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState<string | undefined>("");

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
      console.log(data.data.roomId);
      const meetingDetails = decodeLogin(
        userType === "patient"
          ? data?.data?.patientToken
          : data?.data?.doctorToken
      );
      setRoomID(data?.data?.roomId);
      setUsername(meetingDetails?.username);
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
          <ZegoVideoCall userID={publicId} username={username} />
        </div>

        {/* Leave button overlay */}
        <div
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
        </div>
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

// {
//   "room_id": "null1937c1fc-d9ae-44fe-b6e1-0fb138f1714e",
//   "nbf": "Fri May 23 06:00:00 EDT 2025",
//   "effective_time_in_seconds": "3600",
//   "user_id": "10085709HO7F27468",
//   "secret": "77545aebf428ee6ca2b4d6e6842b5729",
//   "app_id": "576590338",
//   "email": "realPatient@mailinator.com",
//   "username": "hijic",
//   "sub": "realPatient@mailinator.com",
//   "iat": 1747992966,
//   "exp": 1747993866
// }
