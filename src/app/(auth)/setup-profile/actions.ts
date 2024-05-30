"use server";
import { db } from "@/db";

export const updateProfile = async (params: { id: string; name: string }) => {
  const { id, name } = params;
  const users = await db.user.update({
    where: {
      id,
    },
    data: {
      name: name,
      status: "NEW_USER",
    },
  });
  return users;
};
