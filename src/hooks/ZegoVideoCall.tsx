/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router";

type Prop = {
  userID: string;
  username: string | undefined;
  patientToken?: string;
};
export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function ZegoVideoCall({ userID, username }: Prop) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roomID = getUrlParams().get("roomID");

  useEffect(() => {
    const appID = 576590338;
    const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      appID,
      serverSecret,
      roomID!,
      userID,
      username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken!);
    if (containerRef.current) {
      zp.joinRoom({
        container: containerRef.current,
        // onReturnToHomeScreenClicked: () => navigate("/dashboard/appointments"),
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        maxUsers: 2,
        // onLiveEnd?: (user: ZegoUser) => void();
      });

      return () => {
        if (zp) {
          zp.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    const appID = 576590338;
    const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";

    if (!roomID || !userID || !username) {
      console.error("Missing required fields:", { roomID, userID, username });
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      appID,
      serverSecret,
      roomID,
      userID,
      username
    );

    console.log("Generated kitToken", kitToken);

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (containerRef.current) {
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        maxUsers: 2,
      });
    }

    return () => {
      zp?.destroy();
    };
  }, [roomID, userID, username]);

  // useEffect(() => {
  //   if (!roomID || !userID || !username || !patientToken) {
  //     console.error("Missing required info", { roomID, userID, username, patientToken });
  //     return;
  //   }

  //   const zp = ZegoUIKitPrebuilt.create(patientToken);

  //   requestAnimationFrame(() => {
  //     if (containerRef.current) {
  //       zp.joinRoom({
  //         container: containerRef.current,
  //         sharedLinks: [
  //           {
  //             name: "Personal link",
  //             url:
  //               window.location.protocol +
  //               "//" +
  //               window.location.host +
  //               window.location.pathname +
  //               "?roomID=" +
  //               roomID,
  //           },
  //         ],
  //         scenario: {
  //           mode: ZegoUIKitPrebuilt.GroupCall,
  //         },
  //         maxUsers: 2,
  //       });
  //     } else {
  //       console.error("Container ref is not ready");
  //     }
  //   });

  //   return () => {
  //     zp?.destroy();
  //   };
  // }, [roomID, userID, username, patientToken]);

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
