import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";

const f = createUploadthing();

const getSession = async () => {
  const session = await getServerSession();
  if (!session?.user) return "Not authorized";
  return session?.user?.name;
};

const auth = (req: Request) => ({ name: getSession() });

export const ourFileRouter = {
  productPicture: f(["image"])
    .middleware(async ({ req }) => {
      const user = auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userName: user.name };
    })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
