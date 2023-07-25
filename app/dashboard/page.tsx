import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPost from "../post/MyPost";
import { useEffect, useState } from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions as {});
  if (!session) {
    redirect("api/auth/signin");
  }
  console.log(session);
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}</h1>
      <MyPost />
    </main>
  );
};
export default Dashboard;
