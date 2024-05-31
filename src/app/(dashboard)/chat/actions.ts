"use server";
import { Prisma } from "@prisma/client";
import { db } from "../../../db";
import * as fs from "fs";

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
    include: {
      photo: true,
      favChat: {
        include: {
          users: {
            include: {
              photo: true,
            },
          },
        },
      },
    },
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

export const getChatById = async ({ id }: { id: string }) => {
  const chat = await db.chat.findUnique({
    where: {
      id,
    },
    include: {
      usersFav: true,
      users: {
        include: {
          photo: true,
        },
      },
      messages: {
        include: {
          sender: {
            include: {
              photo: true,
            },
          },
        },
      },
    },
  });
  return {
    data: chat,
    success: true,
    message: "retrieved chats",
  };
};

export const startChatsWithAnotherUser = async (params: {
  senderId: string;
  recipientId: string;
}) => {
  const chatExist = await db.chat.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: params.senderId,
            },
          },
        },
        {
          users: {
            some: {
              id: params.recipientId,
            },
          },
        },
      ],
    },
  });

  if (chatExist) throw new Error("Chat with the user already exist.");
  const senderUser = await db.user.update({
    where: { id: params.senderId },
    data: {
      status: "COMPLETE",
    },
  });
  const recipientUser = await db.user.update({
    where: { id: params.recipientId },
    data: {
      status: "COMPLETE",
    },
  });
  const createdChat = await db.chat.create({
    data: {
      users: {
        connect: [{ id: params.senderId }, { id: params.recipientId }],
      },
    },
    include: {
      users: true,
    },
  });
  return {
    success: true,
    message: "started chat",
    data: createdChat,
  };
};

export const searchChats = ({
  userId,
  searchTerm,
}: {
  userId: string;
  searchTerm: string;
}) => {
  if (!searchTerm)
    return getChats({
      where: {
        users: {
          some: {
            id: userId,
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
          // id: userId,
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      },
      messages: {
        some: {
          content: {
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
        include: {
          sender: true,
        },
      },
    },
  }) as unknown as ChatFullType;
};

export const sendMessageToChat = async (params: {
  chatId: string;
  senderId: string;
  content: string;
}) => {
  const msg = await db.message.create({
    data: {
      chatId: params.chatId,
      senderId: params.senderId,
      content: params.content,
    },
  });

  return {
    data: msg,
    success: true,
    message: "Message sent",
  };
};

export const makeChatFavourite = async ({
  chatId,
  userId,
}: {
  userId: string;
  chatId: string;
}) => {
  const chat = db.chat.update({
    where: {
      id: chatId,
    },
    data: {
      usersFav: {
        connect: { id: userId },
      },
    },
  });
  return {
    success: true,
    message: "Chat added to favourites",
    data: chat,
  };
};

export const getUsersToChatWith = async ({ id }: { id: string }) => {
  const where: Prisma.UserWhereInput = {
    id: {
      not: id, // Exclude the current user from the results
    },
    AND: [
      {
        Chat: {
          none: {
            users: {
              some: {
                id: id,
              },
            },
          },
        },
      },
    ],
  };

  const users = await getAllUsers({ where });
  return users;
};
export const getAllUsers = async (params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}) => {
  const users = await db.user.findMany({
    include: {
      photo: true,
    },
  });
  return users;
};
