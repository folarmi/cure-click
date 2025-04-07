/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Flex, Text } from "@radix-ui/themes";
// import { BiX } from "react-icons/bi";
// import { CircularDot } from "../ui/CircularDot";
// import { useQueryClient } from "@tanstack/react-query";
// import { useCustomMutation } from "../../lib/apiCalls";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// const AvailabilitySwitch = ({ toggleModal, isAvailable, selected }: any) => {
//   const queryClient = useQueryClient();

//   const updateDoctorAvailabilityMutation = useCustomMutation({
//     endpoint: `appointment/api/doctors/availability_status`,
//     successMessage: () => "Availability status Updated sucessfully",
//     errorMessage: (error: any) => error?.response?.data?.remark,
//     method: "patch",
//     onSuccessCallback: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["GetDoctorProfile"],
//       });
//       toggleModal();
//     },
//   });

//   return (
//     <div className="p-4 rounded-lg bg-white w-[396px]">
//       <Flex justify="between">
//         <Text size="4" className="font-semibold">
//           Update Availability Status
//         </Text>
//         <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
//       </Flex>
//       <Flex
//         direction="column"
//         justify="center"
//         align="center"
//         className={`mt-4 py-2 rounded ${
//           selected === "Available" ? "bg-grassA3" : "bg-neutral_alpha_3 "
//         }`}
//       >
//         <Text size="2" className="text-black_contrast" as="p">
//           You are about to set your availability status to{" "}
//           <Flex align="center" justify="center">
//             <CircularDot
//               bgColor={`${
//                 selected === "Available" ? "var(--grass9)" : "var(--gray11)"
//               }`}
//             />
//             <Text
//               className={`${
//                 selected === "Available" ? "text-grass9" : "text-gray11"
//               } px-1 font-semibold`}
//               size="3"
//             >
//               {selected === "Available" ? "Available" : "Currently Unavailable"}
//             </Text>
//           </Flex>
//         </Text>
//       </Flex>

//       {selected === "Available" ? (
//         <Text as="p" size="2" className="text-gray11 pt-4 text-center">
//           Setting your status to Available will make your profile visible to
//           patients, allowing new bookings and ensuring you're accessible for
//           appointments.
//         </Text>
//       ) : (
//         <Text as="p" size="2" className="text-gray11 pt-4 text-center">
//           Setting your status to Unavailable will make your profile invisible to
//           patients, preventing new bookings. If you’re temporarily unavailable,
//           update accordingly to keep your schedule accurate.
//         </Text>
//       )}
//       <Text as="p" size="2" className="text-gray11 pt-4 text-center">
//         Click "I understand" to proceed.
//       </Text>

//       <Flex justify="center" className="mt-10">
//         <Button
//           style={{
//             border: "1px solid var(--border-gray)",
//           }}
//           size="2"
//           loading={
//             selected === "Available"
//               ? false
//               : updateDoctorAvailabilityMutation.isPending
//           }
//           onClick={() =>
//             selected === "Available"
//               ? toggleModal()
//               : updateDoctorAvailabilityMutation.mutate(
//                   selected === "Available" ? "AVAILABLE" : "NOT_AVAILABLE"
//                 )
//           }
//           className="w-1/2 bg-white text-neutral_11 mr-4 whitespace-nowrap"
//         >
//           {selected === "Available"
//             ? "Keep my profile in-active"
//             : "I understand"}
//         </Button>
//         <Button
//           className="w-1/2 bg-grass9 text-white I understand"
//           loading={
//             selected === "Available"
//               ? updateDoctorAvailabilityMutation.isPending
//               : false
//           }
//           onClick={() =>
//             selected === "Available"
//               ? updateDoctorAvailabilityMutation.mutate(
//                   selected === "Available" ? "AVAILABLE" : "NOT_AVAILABLE"
//                 )
//               : toggleModal()
//           }
//         >
//           {selected === "Available" ? "I understand" : "Keep my profile active"}
//         </Button>
//       </Flex>
//     </div>
//   );
// };

// export { AvailabilitySwitch };

import { Button, Flex, Text } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { CircularDot } from "../ui/CircularDot";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../lib/apiCalls";

interface AvailabilitySwitchProps {
  toggleModal: () => void;
  isAvailable: boolean;
  selected: "Available" | "Unavailable";
}

const AvailabilitySwitch = ({
  toggleModal,
  selected,
}: AvailabilitySwitchProps) => {
  const queryClient = useQueryClient();

  const updateDoctorAvailabilityMutation = useCustomMutation({
    endpoint: "appointment/api/doctors/availability_status",
    successMessage: () => "Availability status updated successfully",
    errorMessage: (error: any) =>
      error?.response?.data?.remark || "Failed to update availability",
    method: "patch",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ["GetDoctorProfile"] });
      toggleModal();
    },
  });

  const isAvailableStatus = selected === "Available";
  const statusColor = isAvailableStatus ? "grass" : "gray";
  const statusText = isAvailableStatus ? "Available" : "Currently Unavailable";

  const handleStatusUpdate = () => {
    updateDoctorAvailabilityMutation.mutate(
      isAvailableStatus ? "AVAILABLE" : "NOT_AVAILABLE"
    );
  };

  return (
    <div className="p-4 rounded-lg bg-white w-[396px]">
      <Flex justify="between" align="center">
        <Text size="4" weight="bold">
          Update Availability Status
        </Text>
        <BiX className="w-6 h-6 cursor-pointer" onClick={toggleModal} />
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align="center"
        className={`mt-4 py-2 rounded ${
          isAvailableStatus ? "bg-grassA3" : "bg-neutral_alpha_3"
        }`}
      >
        <Text size="2" className="text-black_contrast">
          You are about to set your availability status to{" "}
          <Flex align="center" justify="center" gap="1">
            <CircularDot bgColor={`var(--${statusColor}9)`} />
            <Text
              className={`text-${statusColor}9 px-1 font-semibold`}
              size="3"
            >
              {statusText}
            </Text>
          </Flex>
        </Text>
      </Flex>

      <Text as="p" size="2" className="text-gray11 pt-4 text-center">
        {isAvailableStatus
          ? "Setting your status to Available will make your profile visible to patients, allowing new bookings and ensuring you're accessible for appointments."
          : "Setting your status to Unavailable will make your profile invisible to patients, preventing new bookings. If you're temporarily unavailable, update accordingly to keep your schedule accurate."}
      </Text>
      <Text as="p" size="2" className="text-gray11 pt-4 text-center">
        Click "I understand" to proceed.
      </Text>

      <Flex justify="center" gap="4" className="mt-10">
        <Button
          variant="soft"
          size="2"
          loading={
            !isAvailableStatus && updateDoctorAvailabilityMutation.isPending
          }
          onClick={isAvailableStatus ? toggleModal : handleStatusUpdate}
          className="w-1/2 bg-white text-neutral_11 whitespace-nowrap"
        >
          {isAvailableStatus ? "Keep my profile inactive" : "I understand"}
        </Button>
        <Button
          color="grass"
          size="2"
          loading={
            isAvailableStatus && updateDoctorAvailabilityMutation.isPending
          }
          onClick={isAvailableStatus ? handleStatusUpdate : toggleModal}
          className="w-1/2 text-white"
        >
          {isAvailableStatus ? "I understand" : "Keep my profile active"}
        </Button>
      </Flex>
    </div>
  );
};

export { AvailabilitySwitch };
