/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router";

// function randomID(len: number) {
//   let result = "";
//   if (result) return result;
//   const chars =
//       "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
//     maxPos = chars.length;
//   // len = len || 5;
//   for (let i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

type Prop = {
  userID: string;
  username: string;
};
export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function ZegoVideoCall({ userID, username }: Prop) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roomID = getUrlParams().get("roomID");
  // const navigate = useNavigate();

  // const myMeeting = async (element: any) => {
  //   // generate Kit Token
  //   const appID = 576590338;
  //   const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";
  //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //     appID,
  //     serverSecret,
  //     roomID,
  //     randomID(5),
  //     randomID(5)
  //   );

  //   // Create instance object from Kit Token.
  //   const zp = ZegoUIKitPrebuilt.create(kitToken);
  //   // start the call
  //   zp.joinRoom({
  //     container: element,
  //     sharedLinks: [
  //       {
  //         name: "Personal link",
  //         url:
  //           window.location.protocol +
  //           "//" +
  //           window.location.host +
  //           window.location.pathname +
  //           "?roomID=" +
  //           roomID,
  //       },
  //     ],
  //     scenario: {
  //       mode: ZegoUIKitPrebuilt.OneONoneCall,
  //     },
  //   });
  // };

  useEffect(() => {
    const appID = 576590338;
    const serverSecret = "77545aebf428ee6ca2b4d6e6842b5729";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID!,
      userID,
      username
      // randomID(5),
      // randomID(5)
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
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
      });

      return () => {
        if (zp) {
          zp.destroy();
        }
      };
    }
  }, []);

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
