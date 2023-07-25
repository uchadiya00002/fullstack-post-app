"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../Post";
import AddComment from "../../comment/AddComment";
import Image from "next/image";
type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/post/${slug}`);
  return response?.data;
};
export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url?.params?.slug),
    queryKey: ["detail-post"],
  });
  if (isLoading) return "Loading....";
  const { id, user, title, Comment } = data;
  return (
    <div>
      <Post
        id={id}
        avatar={user?.image}
        name={user?.name}
        postTitle={title}
        comments={Comment}
      />
      <AddComment id={id} />
      {Comment?.map((comment: any) => (
        <div className="my-6 bg-white p-8 rounded-md" key={comment.id}>
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
