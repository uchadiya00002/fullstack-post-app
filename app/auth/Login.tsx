"use client";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <li className="list-none">
      <button
        onClick={() => signIn()}
        className="text-sm bg-gray-600 border text-white py-2 px-6 rounded"
      >
        Sign In
      </button>
    </li>
  );
};

export default Login;
