"use client";
import Image from "next/image";
import AddPost from "./post/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "./post/Post";
import { PostType } from "./types/Post";
import Dashboard from "./dashboard/page";

const allPosts = async () => {
  const response = await axios.get("/api/post/getPost");
  return response.data;
};
export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["post"],
  });
  if (error) return error;
  if (isLoading) return "Loading....";
  console.log(data, "all post");
  return (
    <main className="">
      <AddPost />
      {/* <Dashboard /> */}
      {data?.map((post, idx) => (
        <Post
          key={post.id}
          name={post?.user?.name}
          avatar={post?.user?.image}
          id={post?.id}
          comments={post?.Comment}
          postTitle={post?.title}
        />
      ))}
    </main>
  );
}
