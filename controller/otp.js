import dotenv from "dotenv";
import nodemailer from "nodemailer";

import { Otp } from "../model/otpmodel.js";

dotenv.config();

// nodemailer transport
let transport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const generateOtp = async (req, res) => {
  const currentOtp = await Otp.findOne({ userId: req.body.uid });
  if (currentOtp) {
    await Otp.deleteMany({ userId: req.body.uid });
  }

  try {
    const newOTP = `${Math.floor(100000 + Math.random() * 900000)}`;

    const newOtp = new Otp({
      userId: req.body.uid,
      otp: newOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 220000,
    });

    await newOtp.save();

    await transport
      .sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Confirmation email from Orage Technologies",
        html: `Enter this otp for verifying your account: <b>${newOTP}</b>
              Your otp will expire in 2 minutes`,
      })
      .then(() => {
        console.log("Email sent");
        res.status(200).json({
          otpCreated: true,
        });
      });
  } catch (err) {
    console.error("Some error occured while sending mail" + err);
    res.status(400).json({
      otpCreaterd: false,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const userOtp = await Otp.findOne({ userId: req.body.uid });

  if (userOtp === null) {
    console.log("Otp not generated");
    return res.status(401).json({
      otpExpired: false,
      otpValid: false,
    });
  }

  let { expireAt } = userOtp;

  if (expireAt < Date.now()) {
    await Otp.deleteMany({ userId: req.body.uid });
    console.log("otp expired");
    return res.status(200).json({
      otpExpired: true,
      otpValid: false,
    });
  }
  try {
    if (userOtp.otp != req.body.otp) {
      console.log("Wrong otp");
      res.status(200).json({
        otpValid: false,
        otpExpired: false,
      });
    } else {
      await Otp.deleteOne({ userId: req.body.uid });

      res.status(201).json({
        otpValid: true,
        otpExpired: false,
        userVerified: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      otpValid: false,
      otpExpired: false,
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    let { uid } = req.body;
    const userOtp = await User.findOne({ _id: uid });

    if (userOtp === null) {
      console.log("No uid found");
      return res.status(401).json({
        userVerified: false,
        otpResent: false,
      });
    } else {
      await Otp.deleteOne({ userId });
      console.log("Resent otp");
      res.status(200).json({
        userVerified: false,
        otpResent: true,
      });
    }
  } catch (err) {
    console.log("some error occured while resending otp");
    res.status(500).json({
      userVerified: false,
    });
  }
};
