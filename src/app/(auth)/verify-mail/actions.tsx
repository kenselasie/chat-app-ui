"use server";

import { db } from "@/db";
import { z } from "zod";
import jwt from "jsonwebtoken";

const verifyOTPCodeValidator = z.object({
  email: z.string(),
  otpCode: z.string(),
});

export const verifyOTPCode = async (params: {
  email: string;
  otpCode: string;
}) => {
  const { email, otpCode } = params;
  const validation = verifyOTPCodeValidator.safeParse(params);
  if (!validation.success) {
    throw new Error(
      "Invalid input: " +
        validation.error.errors.map((e) => e.message).join(", ")
    );
  }

  const otp = await db.oTP.findFirst({
    where: {
      code: otpCode,
      user: { email },
      expiresAt: { gt: new Date() },
    },
    include: {
      user: true,
    },
  });

  if (!otp) {
    throw new Error("Invalid or expired OTP");
  }
  await db.oTP.deleteMany({
    where: {
      user: { email },
    },
  });
  const jwt_token = jwt.sign(
    {
      email: otp.user.email,
      userId: otp.user.id,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "24h",
    }
  );

  return {
    accessToken: jwt_token,
    userDetails: otp.user,
  };
};
