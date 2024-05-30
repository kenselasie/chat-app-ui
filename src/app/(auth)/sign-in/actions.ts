"use server";
import { z } from "zod";
import { db } from "../../../db";
import { nanoid } from "nanoid";
import { generateOTP } from "@/lib/utils";
import { sendEmail } from "@/lib/email";

const signInFlowValidator = z.object({
  email: z.string(),
});

export const sendOTPVerification = async (params: { email: string }) => {
  const validation = signInFlowValidator.safeParse(params);
  if (!validation.success) {
    throw new Error(
      "Invalid input: " +
        validation.error.errors.map((e) => e.message).join(", ")
    );
  }
  const OTPCode = generateOTP({ length: 6 });
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  const placeholder_username = nanoid();

  const otpResults = await db.oTP.create({
    data: {
      code: OTPCode,
      expiresAt,
      user: {
        connectOrCreate: {
          where: { email: params.email },
          create: { email: params.email, username: placeholder_username },
        },
      },
    },
  });

  console.log(OTPCode);
  await transportOTPMail({ toMail: params.email, OTPCode: otpResults.code });
  return {
    success: true,
    data: null,
    message: "Please check your mail",
  };
};

const transportOTPMail = async ({
  toMail,
  OTPCode,
}: {
  toMail: string;
  OTPCode: string;
}) => {
  const data = {
    from: "OTP <no-reply@mail.fmcpilot.com>",
    to: [toMail, "ken@techvision.global"],
    subject: "Your OTP code",
    html: `<div>
              <b>Here is your OTP code.</b> <br /> 
              <b>${OTPCode}</b><br /><br />
              <p>This code will expire in 10 minutes</p>
            </div>`,
  };
  return await sendEmail(data);
};
