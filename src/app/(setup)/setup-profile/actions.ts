"use server";
import { db } from "@/db";
import * as fs from "fs";
import { IncomingForm, File as FormidableFile } from "formidable";
import path from "path";
import { revalidatePath } from "next/cache";

export const updateProfile = async (params: {
  id: string;
  name: string;
  profilePhoto?: FormData;
}) => {
  let uploadId;
  const { id, name, profilePhoto } = params;
  if (profilePhoto) {
    const file = profilePhoto.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const currentTimestamp = Date.now();
    const encodedFilename = `${currentTimestamp}_${file.name}`;
    await fs.writeFileSync(`./public/uploads/${encodedFilename}`, buffer);
    revalidatePath("/");

    const upload = await db.upload.create({
      data: {
        original: encodedFilename,
        thumbnail: encodedFilename,
        title: "ProfilePic",
      },
    });
    uploadId = upload.id;
  }

  const users = await db.user.update({
    where: {
      id,
    },
    data: {
      name: name,
      status: "NEW_USER",
      photoId: uploadId,
    },
  });
  return users;
};
