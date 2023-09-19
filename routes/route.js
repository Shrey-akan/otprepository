import { resendOtp, generateOtp, verifyOtp } from "../controller/otp.js";

export const routes = (router) => {
  router.post("/0auth/verifyOtp", verifyOtp);
  router.post("/0auth/resendOtp", resendOtp);
  router.post("/0auth/generateOtp", generateOtp);
};
