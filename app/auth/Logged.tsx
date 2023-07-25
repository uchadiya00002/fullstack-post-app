"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

type User = {
  image: string;
};

const Logged = ({ image }: User) => {
  return (
    <li className="list-none flex items-center gap-3">
      <button
        onClick={() => signOut()}
        className="text-sm bg-gray-600 border text-white py-2 px-6 rounded"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          className="w-14 rounded-full"
          src={image}
          alt="Profile Picture"
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
