// zego.ts
import ZegoExpressEngine from "zego-express-engine-webrtc";

const appID = 123456789;
const server = "wss://webliveroom123456789-api.zegocloud.com/ws";

export const createZegoEngine = (userID: string, userName: string) => {
  return ZegoExpressEngine.(appID, server, true, {
    userID,
    userName,
  });
};
