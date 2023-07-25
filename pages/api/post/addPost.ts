import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      res.status(401).json({ message: "Please sign in to create a post" });

    const title: string = req.body.title;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
    console.log(prismaUser?.id, "prismaid");
    if (title.length > 300)
      return res.status(403).json({ message: "Please Write a shorted post" });

    if (!title.length)
      return res.status(403).json({ message: "Please do not leave it empty" });
    // Create a post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: "Error occured while creating a post" });
      console.log(error);
    }
  }
}
