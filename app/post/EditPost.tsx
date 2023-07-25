"use client";
import React, { useState } from "react";
import Image from "next/image";
import Toggle from "../special/Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPost = ({ id, avatar, title, name, comments }: EditProps) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  const handleToggle = () => setToggle(!toggle);
  let deleteToastID: string;
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("api/post/deletePost", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error while Deleting the post", { id: deleteToastID });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["auth-post"]);
        toast.success("Post Deleted Successfully🔥", { id: deleteToastID });
        console.log(data);
      },
    }
  );
  const handleDeletePost = () => {
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-2">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-300">
            {comments?.length} Comments
          </p>
          <button
            onClick={handleToggle}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle setToggle={setToggle} deletePost={handleDeletePost} />}
    </>
  );
};

export default EditPost;
