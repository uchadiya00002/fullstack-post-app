"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { PostType } from "../types/Post";

type PostProps = {
  id: string;
  avatar: string;
  name: string;
  postTitle: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
export default function Post({
  id,
  name,
  avatar,
  postTitle,
  comments,
}: PostProps) {
  // const router = useRouter();
  return (
    <div className="flex p-4 flex-col bg-white rounded  mt-4">
      <Link href={`/post/${id}`}>
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8 ">
          <p className="break-all">{postTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link
            href={{
              pathname: `/post/${id}`,
            }}
          >
            <p className=" text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
        </div>
      </Link>
      {/* //   </motion.div> */}
    </div>
  );
}
