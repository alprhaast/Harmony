import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { getCurrentUserId } from "~/server/queries";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 40 },
  })
    .middleware(async ({ req }) => {
      const userId = await getCurrentUserId();
      
      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(metadata);
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
