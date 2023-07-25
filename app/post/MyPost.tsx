"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthPosts } from "../types/AuthPost";
import EditPost from "./EditPost";
const fetchPostAfterAuth = async () => {
  const response = await axios.get("/api/post/authPost");
  return response?.data;
};
const MyPost = () => {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchPostAfterAuth,
    queryKey: ["auth-post"],
  });
  if (isLoading) return <h1>Posts are Loading.....</h1>;
  console.log(data);
  return (
    <div>
      {data?.Post?.map((post, idx) => (
        <EditPost
          key={post.id}
          name={data?.name}
          avatar={data?.image}
          id={post?.id}
          comments={post?.Comment}
          title={post?.title}
        />
      ))}
    </div>
  );
};

export default MyPost;
