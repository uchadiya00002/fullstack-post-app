import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions as {});
    if (!session) {
      res.status(401).json({ message: "Please sign in" });
    }

    // Delete a post
    try {
      const postId = req.body
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
        
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: "Error occured while Signin" });
      console.log(error);
    }
  }
}
