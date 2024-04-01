import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalıd ID");
    }

    const post = await prisma?.post?.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postId) {
      throw new Error("Invalıd ID");
    }

    let updatedLikedIds = [...(post?.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);
    }

    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    const updatedPost = await prisma?.post?.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log("error", error);
    return res.status(400).end();
  }
}
