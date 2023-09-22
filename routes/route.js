import { resendOtp, generateOtp, verifyOtp } from "../controller/otp.js";
import {
  readMessage,
  sendMessage,
  deleteMessage,
  receiveMessage,
} from "../controller/notify.js";

export const routes = (router) => {
  router.post("/0auth/verifyOtp", verifyOtp);
  router.post("/0auth/resendOtp", resendOtp);
  router.post("/0auth/generateOtp", generateOtp);
  router.post("/0notif/sendMsg", sendMessage);
  router.post("/0notif/recMsg", receiveMessage);
  router.post("/0notif/deleteMsg", deleteMessage);
  router.post("/0notif/readMsg", readMessage);
};
