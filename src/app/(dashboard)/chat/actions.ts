"use server";
import { Prisma } from "@prisma/client";
import { db } from "../../../db";

type ChatFullType = Prisma.ChatGetPayload<{
  include: {
    users: {
      include: {
        photo: true;
      };
    };
    messages: {
      include: {
        sender: true;
      };
    };
  };
}>[];
export const getUserByID = async ({ id }: { id: string }) => {
  const user = await db.user.findUnique({
    where: { id },
    include: { photo: true },
  });
  return user;
};

export const startAChatWithSelf = async ({ id }: { id: string }) => {
  const user = await db.user.update({
    where: { id },
    data: {
      status: "COMPLETE",
    },
  });
  const createdChat = await db.chat.create({
    data: {
      chatName: user.name,
      users: {
        connect: [{ id }],
      },
    },
  });
  return {
    success: true,
    message: "started chat",
    data: createdChat,
  };
};
const getChats = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ChatWhereUniqueInput;
  where?: Prisma.ChatWhereInput;
  include?: Prisma.ChatInclude;
  orderBy?: Prisma.ChatOrderByWithRelationInput;
}) => {
  const chats = await db.chat.findMany(params);
  return chats;
};

export const searchChats = (searchTerm: string) => {
  if (!searchTerm)
    return getChats({
      include: {
        users: {
          include: {
            photo: true,
          },
        },
        messages: {
          include: {
            sender: true,
          },
        },
      },
    }) as unknown as ChatFullType;
  return getChats({
    where: {
      users: {
        some: {
          username: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      users: {
        include: {
          photo: true,
        },
      },
      messages: {
        where: {
          sender: {
            username: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        include: {
          sender: true,
        },
      },
    },
  }) as unknown as ChatFullType;
};

export const getAllUsers = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}) => {
  const users = await db.user.findMany({});
  return users;
};
