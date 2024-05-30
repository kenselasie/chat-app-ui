"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getAllUsers = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}) => {
  const users = await db.user.findMany({});
  console.log(users);
  return users;
};
