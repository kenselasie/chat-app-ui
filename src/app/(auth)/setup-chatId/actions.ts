"use server";
import { db } from "@/db";

export const updateChatId = async (params: {
  id: string;
  username: string;
}) => {
  const { id, username } = params;
  const users = await db.user.update({
    where: {
      id,
    },
    data: {
      username: username,
      status: "MUST_UPDATE_NAME",
    },
  });
  return users;
};
