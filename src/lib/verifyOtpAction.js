"use server";

import { cookies } from "next/headers";

export const verifyOtpAction = async ({ email, otp, name, phone }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp, name, phone }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  // ✅ SET COOKIE ON SERVER
  cookies().set("_userInfo", JSON.stringify(data), {
    httpOnly: true,
    path: "/",
  });

  return data;
};