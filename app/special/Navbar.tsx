import Link from "next/link";
import React from "react";
import Login from "../auth/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "../auth/Logged";

const Navbar = async () => {
  const session = await getServerSession(authOptions as {});
  // const userName = session?.user?.name?.split(" ")[0];
  // console.log(session?.user);
  return (
    <nav className="w-full flex  justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">Post App</h1>
      </Link>
      <ul>
        {!session?.user ? (
          <Login />
        ) : (
          <Logged image={session?.user?.image || ""} />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
