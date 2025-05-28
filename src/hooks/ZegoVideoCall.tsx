// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-refresh/only-export-components */
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useEffect, useRef } from "react";
// // import { useNavigate } from "react-router";

// type Prop = {
//   userID: string;
//   username: string | undefined;
//   patientToken?: string;
// };
// export function getUrlParams(url = window.location.href) {
//   const urlStr = url.split("?")[1];
//   return new URLSearchParams(urlStr);
// }

// export default function ZegoVideoCall({
//   userID,
//   username,
//   patientToken,
// }: Prop) {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const roomID = getUrlParams().get("roomID");

//   console.log("roomID", roomID, "userID", userID, "username", username);

//   // useEffect(() => {
//   //   const appID = 576590338;
//   //   const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";
//   //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//   //     appID,
//   //     serverSecret,
//   //     roomID!,
//   //     userID,
//   //     username
//   //   );

//   //   const zp = ZegoUIKitPrebuilt.create(kitToken!);
//   //   if (containerRef.current) {
//   //     zp.joinRoom({
//   //       container: containerRef.current,
//   //       // onReturnToHomeScreenClicked: () => navigate("/dashboard/appointments"),
//   //       sharedLinks: [
//   //         {
//   //           name: "Personal link",
//   //           url:
//   //             window.location.protocol +
//   //             "//" +
//   //             window.location.host +
//   //             window.location.pathname +
//   //             "?roomID=" +
//   //             roomID,
//   //         },
//   //       ],
//   //       scenario: {
//   //         mode: ZegoUIKitPrebuilt.GroupCall,
//   //       },
//   //       maxUsers: 2,
//   //       // onLiveEnd?: (user: ZegoUser) => void();
//   //     });

//   //     return () => {
//   //       if (zp) {
//   //         zp.destroy();
//   //       }
//   //     };
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   const appID = 576590338;
//   //   const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";

//   //   if (!roomID || !userID || !username) {
//   //     console.error("Missing required fields:", { roomID, userID, username });
//   //     return;
//   //   }

//   //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//   //     appID,
//   //     serverSecret,
//   //     roomID,
//   //     userID,
//   //     username
//   //   );

//   //   console.log("Generated kitToken", kitToken);

//   //   const zp = ZegoUIKitPrebuilt.create(kitToken);

//   //   if (containerRef.current) {
//   //     zp.joinRoom({
//   //       container: containerRef.current,
//   //       sharedLinks: [
//   //         {
//   //           name: "Personal link",
//   //           url:
//   //             window.location.protocol +
//   //             "//" +
//   //             window.location.host +
//   //             window.location.pathname +
//   //             "?roomID=" +
//   //             roomID,
//   //         },
//   //       ],
//   //       scenario: {
//   //         mode: ZegoUIKitPrebuilt.GroupCall,
//   //       },
//   //       maxUsers: 2,
//   //     });
//   //   }

//   //   return () => {
//   //     zp?.destroy();
//   //   };
//   // }, [roomID, userID, username]);

//   useEffect(() => {
//     if (!roomID || !userID || !username || !patientToken) return;

//     const zp = ZegoUIKitPrebuilt.create(patientToken);

//     requestAnimationFrame(() => {
//       if (containerRef.current) {
//         zp.joinRoom({
//           container: containerRef.current,
//           sharedLinks: [
//             {
//               name: "Personal link",
//               url:
//                 window.location.protocol +
//                 "//" +
//                 window.location.host +
//                 window.location.pathname +
//                 "?roomID=" +
//                 roomID,
//             },
//           ],
//           scenario: {
//             mode: ZegoUIKitPrebuilt.GroupCall,
//           },
//           maxUsers: 2,
//         });
//       } else {
//         console.error("Zego containerRef is not ready");
//       }
//     });

//     return () => {
//       zp.destroy();
//     };
//   }, [roomID, userID, username, patientToken]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//       }}
//     />
//   );
// }

// // "data": {
// //   "id": 39,
// //   "publicId": "0919310H6X1H11124",
// //   "createdDate": "2025-05-28T09:19:32.003187",
// //   "lastModifiedDate": "2025-05-28T09:19:32.003187",
// //   "createdBy": "nawa",
// //   "lastModifiedBy": "nawa",
// //   "patientToken": "eyJhbGciOiJIUzI1NiJ9.eyJyb29tX2lkIjoibnVsbGMwNjdmOGJiLTg3N2EtNDIyNi1iM2FmLTVmY2MxOGE3NGY4ZSIsIm5iZiI6IjIwMjUtMDUtMjhUMTM6MjA6MDBaIiwiZWZmZWN0aXZlX3RpbWVfaW5fc2Vjb25kcyI6IjM2MDAiLCJ1c2VyX2lkIjoiMTAwODU3MDlITzdGMjc0NjgiLCJhY3Rpb24iOiJtZWV0aW5nIiwic2VjcmV0IjoiNzc1NDVhZWJmNDI4ZWU2Y2EyYjRkNmU2ODQyYjU3MjkiLCJhcHBfaWQiOiI1NzY1OTAzMzgiLCJlbWFpbCI6InJlYWxQYXRpZW50QG1haWxpbmF0b3IuY29tIiwidXNlcm5hbWUiOiJoaWppYyIsInN1YiI6InJlYWxQYXRpZW50QG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ4NDM4MzcxLCJleHAiOjE3NDg0NDIwMDB9.p-_j4D2ShlSBNSUmxv_69zYnVdI1mR6YCSJecRct_bU",
// //   "doctorToken": "eyJhbGciOiJIUzI1NiJ9.eyJyb29tX2lkIjoibnVsbGMwNjdmOGJiLTg3N2EtNDIyNi1iM2FmLTVmY2MxOGE3NGY4ZSIsIm5iZiI6IjIwMjUtMDUtMjhUMTM6MjA6MDBaIiwiZWZmZWN0aXZlX3RpbWVfaW5fc2Vjb25kcyI6IjM2MDAiLCJ1c2VyX2lkIjoiMTMyODI2Mkg2UTFTNjk4OCIsImFjdGlvbiI6Im1lZXRpbmciLCJzZWNyZXQiOiI3NzU0NWFlYmY0MjhlZTZjYTJiNGQ2ZTY4NDJiNTcyOSIsImFwcF9pZCI6IjU3NjU5MDMzOCIsImVtYWlsIjoibmF3YUBtYWlsaW5hdG9yLmNvbSIsInVzZXJuYW1lIjoibmF3YSIsInN1YiI6Im5hd2FAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDg0MzgzNzEsImV4cCI6MTc0ODQ0MjAwMH0.zOA9WYDQ1Qx70n9SjVOGT3ytaq9b66b2oagnQ9laRrU",
// //   "roomId": "nullc067f8bb-877a-4226-b3af-5fcc18a74f8e",
// //   "nbf": "2025-05-28T13:20:00Z"
// // },

// // eyJhbGciOiJIUzI1NiJ9.eyJyb29tX2lkIjoibnVsbGMwNjdmOGJiLTg3N2EtNDIyNi1iM2FmLTVmY2MxOGE3NGY4ZSIsIm5iZiI6IjIwMjUtMDUtMjhUMTM6MjA6MDBaIiwiZWZmZWN0aXZlX3RpbWVfaW5fc2Vjb25kcyI6IjM2MDAiLCJ1c2VyX2lkIjoiMTAwODU3MDlITzdGMjc0NjgiLCJhY3Rpb24iOiJtZWV0aW5nIiwic2VjcmV0IjoiNzc1NDVhZWJmNDI4ZWU2Y2EyYjRkNmU2ODQyYjU3MjkiLCJhcHBfaWQiOiI1NzY1OTAzMzgiLCJlbWFpbCI6InJlYWxQYXRpZW50QG1haWxpbmF0b3IuY29tIiwidXNlcm5hbWUiOiJoaWppYyIsInN1YiI6InJlYWxQYXRpZW50QG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ4NDM4MzcxLCJleHAiOjE3NDg0NDIwMDB9.p-_j4D2ShlSBNSUmxv_69zYnVdI1mR6YCSJecRct_bU

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

type Prop = {
  userID: string;
  username: string | undefined;
  patientToken?: string;
};

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function ZegoVideoCall({
  userID,
  username,
  patientToken,
}: Prop) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roomID = getUrlParams().get("roomID");

  useEffect(() => {
    if (!roomID || !userID || !username || !patientToken) {
      console.error("Missing required parameters:", {
        roomID,
        userID,
        username,
        patientToken,
      });
      return;
    }

    try {
      console.log("Initializing Zego with token:", patientToken);
      const zp = ZegoUIKitPrebuilt.create(patientToken);

      if (!containerRef.current) {
        console.error("Container ref is not available");
        return;
      }

      const joinRoomConfig = {
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        maxUsers: 2,
      };

      console.log("Joining room with config:", joinRoomConfig);
      zp.joinRoom(joinRoomConfig);

      return () => {
        console.log("Destroying Zego instance");
        zp.destroy();
      };
    } catch (error) {
      console.error("Zego initialization error:", error);
    }
  }, [roomID, userID, username, patientToken]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    />
  );
}
